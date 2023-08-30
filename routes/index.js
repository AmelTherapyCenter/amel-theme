import { Router } from "express";
import 'dotenv/config';
import { cost_calculator_questions } from '../settings_data.js';
import { findMonth } from '../utils.js';

const { 
    ADMIN_API_HOST,
    SITE_MONGO_ID
} = process.env;

const router = Router();

router.get("/cost-calculator", (req, res, next) => {
    res.render("cost-calculator", {
        cost_calculator_questions,
        page: {
            title: "Cost Calculator",
            description: "Try out our user-friendly online tool that generates estimated prices quickly and accurately. We take pride in our commitment and strong connection to the local community, particularly in Hollywood. Trust us to provide top-notch tree care across South Florida, including Davie, Sunrise, Southwest Ranches, and Plantation. Get ready for a reliable and personable service that will leave your trees looking amazing!"
        }
    })
});

router.get("/contact", (req, res, next) => {
    res.render("contact", {
        page: {
            title: "Contact Us",
            description: "Contact us today for exceptional tree care! Whether you have inquiries, need a quote, or want to schedule an appointment, our friendly team is ready to assist you. Our skilled and licensed professionals and strong community ties, particularly in Hollywood, sets us apart. Don't hesitate to reach out to us for top-notch tree care in South Florida, including Davie, Sunrise, Southwest Ranches, and Plantation. Fill out the form below or give us a call, and let's make your trees shine!"
        }
    })
});

router.get("/about", (req, res, next) => {
    res.render("about", {
        page: {
            title: "About Us",
            description: "Our team is comprised of licensed and insured professionals who possess an exceptional work ethic and a friendly demeanor. As a local company based in Hollywood, we prioritize ethical practices and strive to provide you with the finest tree care available in South Florida, specifically in Hollywood, Davie, Sunrise, Southwest Ranches, and Plantation."
        }
    })
});

router.get("/frequently-asked-questions", (req, res, next) => {
    res.render("faq", {
        page: {
            title: "Frequently Asked Questions",
            description: "Welcome to our tree removal and trimming services in beautiful South Florida! Our team of skilled and licensed professionals, along with our dedicated crew, is here to provide you with outstanding results. We take pride in our commitment to ethical practices and our strong ties to the local community, especially in Hollywood. Trust us to deliver top-notch tree care throughout South Florida, including Davie, Sunrise, Southwest Ranches, and Plantation. Get ready for a friendly and reliable service that will leave your trees looking their best!"
        }
    })
});

router.get("/categories/:category", async (req, res, next) => {
    const category = req.params.category.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const result = await fetch(`${ADMIN_API_HOST}/api/site/categories/${SITE_MONGO_ID}/${category}`, {
        method: "GET",
    });
    const data = await result.json();

    if (!data || !data.length) {
        res.status(404);
        res.render('404', { dark_bg: true });
    } else {
        const changeDates = data.map(article => {
            let timestamp = article.updatedAt ? article.updatedAt : article.createdAt;
            timestamp = new Date(timestamp)
            article.date = `${findMonth(timestamp.getMonth())} ${timestamp.getDate()}, ${timestamp.getFullYear()}`;
            return article;
        })
        const articles = changeDates.filter(article => article.published);

        res.render("category", {
            category,
            articles,
            page: {
                title: `Our Blog - ${category}`,
                description: `View our ${category} blog category and all things tree care in South Florida! Our goal is to provide you with valuable information, guidance, and inspiration to help you nurture and maintain the beauty of your trees. Join us on this as we explore topics that resonate with tree care in South Florida and beyond.`
            }
        })
    }
});

router.get("/blog", async (req, res, next) => {
    const result = await fetch(`${ADMIN_API_HOST}/api/site/articles/${SITE_MONGO_ID}/articles`, {
        method: "GET",
    });
    const data = await result.json();

    if (!data || !data.length) {
        res.status(404);
        res.render('404', { dark_bg: true });
    } else {
        const changeDates = data.map(article => {
            let timestamp = article.updatedAt ? article.updatedAt : article.createdAt;
            timestamp = new Date(timestamp)
            article.date = `${findMonth(timestamp.getMonth())} ${timestamp.getDate()}, ${timestamp.getFullYear()}`;
            return article;
        })

        let categories = [];
        const articles = changeDates.filter(article => {
            if (article.published) {
                categories = categories.concat(article.categories)
                return article;
            }
        });
        categories = categories.filter((cat, i) => categories.indexOf(cat) === i);

        res.render("all-articles", {
            categories,
            articles,
            page: {
                title: "Our Blog",
                description: "Welcome to our blog dedicated to all things tree care in South Florida! Here, we share insightful articles, expert tips, and engaging stories about tree removal, trimming, and everything in between. Our goal is to provide you with valuable information, guidance, and inspiration to help you nurture and maintain the beauty of your trees. Join us on this as we explore topics that resonate with tree care in South Florida and beyond."
            }
        })
    }
});

router.get("/blog/:blogId", async (req, res, next) => {
    const { blogId } = req.params;
    const result = await fetch(`${ADMIN_API_HOST}/api/site/articles/${SITE_MONGO_ID}/slug-${blogId}`, {
        method: "GET",
    });
    const data = await result.json();

    const articlesRes = await fetch(`${ADMIN_API_HOST}/api/site/articles/${SITE_MONGO_ID}/articles`, {
        method: "GET",
    });
    const articles = await articlesRes.json();
    const i = articles.findIndex(article => JSON.stringify(article) === JSON.stringify(data));

    if (!data) {
        res.status(404);
        res.render('404', { dark_bg: true });
    } else {
        let timestamp = data.updatedAt ? data.updatedAt : data.createdAt;
        timestamp = new Date(timestamp)
        data.date = `${findMonth(timestamp.getMonth())} ${timestamp.getDate()}, ${timestamp.getFullYear()}`;

        const prevIndex = i - 1 < 0 ? 0 : i - 1;
        const nextIndex = i + 1 > articles.length - 1 ? articles.length - 1 : i + 1;

        res.render("article", {
            prevArticle: articles[prevIndex],
            nextArticle: articles[nextIndex],
            article: data,
            page: {
                title: "Our Blog",
                description: "Welcome to our blog dedicated to all things tree care in South Florida! Here, we share insightful articles, expert tips, and engaging stories about tree removal, trimming, and everything in between. Our goal is to provide you with valuable information, guidance, and inspiration to help you nurture and maintain the beauty of your trees. Join us on this as we explore topics that resonate with tree care in South Florida and beyond."
            }
        });
    }
});

router.get("/pages/:page", async (req, res, next) => {
    try {
        const { page } = req.params;

        const result = await fetch(`${ADMIN_API_HOST}/api/site/pages/${SITE_MONGO_ID}/slug-${page}`, {
            method: "GET",
        });
        const data = await result.json();

        if (!data) {
            res.status(404);
            res.render('404', { dark_bg: true });
        } else {
            res.render("page", {
                pageCMS: data,
                page: {
                    title: data.name,
                    description: data.description
                }
            })
        }
    } catch (err) {
        console.error("Error: ", err)
        res.status(400).send(err);
    }
});

router.get("/pages", async (req, res, next) => {
    const result = await fetch(`${ADMIN_API_HOST}/api/site/pages/${SITE_MONGO_ID}/pages`, {
        method: "GET",
    });
    const data = await result.json();

    if (!data || !data.length) {
        res.status(404);
        res.render('404', { dark_bg: true });
    } else {
        res.render("all-pages", {
            pagesCMS: data,
            page: {
                title: "Our Pages",
                description: "View each of our pages dedicated to tree care in South Florida! Trust us to deliver top-notch tree care throughout South Florida, including Davie, Sunrise, Southwest Ranches, and Plantation. Get ready for a friendly and reliable service that will leave your trees looking their best!"
            }
        })
    }
});

router.get("/", async (req, res, next) => {
    const result = await fetch(`${ADMIN_API_HOST}/api/site/articles/${SITE_MONGO_ID}/articles`, {
        method: "GET",
    });
    const data = await result.json();
    const changeDates = data.map(article => {
        let timestamp = article.updatedAt ? article.updatedAt : article.createdAt;
        timestamp = new Date(timestamp)
        article.date = `${findMonth(timestamp.getMonth())} ${timestamp.getDate()}, ${timestamp.getFullYear()}`;
        return article;
    })
    const articles = changeDates.filter(article => article.published);

    res.render("index", {
        articles: [articles[0], articles[1]],
        page: {
            title: "Tree Services Of Broward",
            description: "We offer tree removal & trimming services in South Florida. We are all licensed & insured with a great personable crew that has an unmatched work ethic. We're an ethical company that is local to Hollywood and we're committed to giving you best tree care in South Florida: Hollywood, Davie, Sunrise, Southwest Ranches, and Plantation."
        }
    })
});

router.get("/services", (req, res, next) => {
    res.render("all-services", {
        page: {
            title: "Our Services",
            description: "Discover our comprehensive tree removal and trimming services available in South Florida. With a focus on excellence, our skilled and licensed team, along with our dedicated crew, delivers unmatched results. We take pride in our commitment to ethical practices and our strong ties to the local community, particularly in Hollywood. Trust us to provide you with top-notch tree care in South Florida, covering areas such as Davie, Sunrise, Southwest Ranches, and Plantation."
        }
    })
});

router.get("/services/:service", async (req, res, next) => {
    try {
        const { service } = req.params;

        const result = await fetch(`${ADMIN_API_HOST}/api/site/services/${SITE_MONGO_ID}/slug-${service}`, {
            method: "GET",
        });
        const data = await result.json();
        
        if (!data) {
            res.status(404);
            res.render('404', { dark_bg: true });
        } else {
            res.render("service", {
                service: data,
                page: {
                    title: data.name,
                    description: data.description
                }
            })
        }
    } catch (err) {
        console.error("Error: ", err)
        res.status(400).send(err);
    }
});

export default router;