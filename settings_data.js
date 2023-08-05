
import 'dotenv/config';

const { 
    ADMIN_API_HOST,
    SITE_MONGO_ID
} = process.env;

export const siteData = async () => {
    try {
        const res = await fetch(`${ADMIN_API_HOST}/api/site/${SITE_MONGO_ID}`, {
            method: "GET",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error(404, 'Not found');
    }
}

// export const site_data = {
// 	name: 'Broward Tree Techs',
// 	handle: 'broward-tree-techs',
// 	description: "We offer tree removal & trimming services in South Florida. We are all licensed & insured with a great personable crew that has an unmatched work ethic. We're an ethical company that is local to Hollywood and we're committed to giving you best tree care in South Florida: Hollywood, Davie, Sunrise, Southwest Ranches, and Plantation.",
// 	phone_number: '954-408-2313',
// 	seo_title: 'Tree Services Of Broward',
// 	locations: [
// 		'Hollywood',
// 		'Sunrise',
// 		'Davie',
// 		'Plantation',
// 		'Southwest Ranches'
// 	]
// }

export const main_menu = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'Services',
        url: '/services',
        links: [
            {
                title: 'Tree Removal',
                url: '/services/tree-removal',
            },
            {
                title: 'Tree Trimming',
                url: '/services/tree-trimming',
            }
        ]
    },
    {
        title: 'About',
        url: '/about'
    },
    {
        title: 'Blog',
        url: '/blog'
    },
    {
        title: 'Cost Calculator',
        url: '/cost-calculator'
    }
]

export const footer_menu_one = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'About Us',
        url: '/about'
    },
    {
        title: 'Blog',
        url: '/blog'
    },
    {
        title: 'Search',
        url: '/search'
    },
]

export const footer_menu_two = [
    {
        title: 'Tree Removal',
        url: '/services/tree-removal',
    },
    {
        title: 'Tree Trimming',
        url: '/services/tree-trimming',
    },
    {
        title: 'All Services',
        url: '/all-services'
    },
]

export const footer_menu_three = [
    {
        title: 'Contact Us',
        url: '/contact-us'
    },
    {
        title: 'Cost Calculator',
        url: '/cost-calculator'
    },
    {
        title: 'FAQ',
        url: '/faq'
    }
]