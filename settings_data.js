
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

export const getMenu = async (slug) => {
    try {
        const res = await fetch(`${ADMIN_API_HOST}/api/site/navigation/${SITE_MONGO_ID}/slug-${slug}`, {
            method: "GET",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error(404, 'Not found');
    }
}

export const cost_calculator_questions = [
    {
        question: "What is your project timeframe?",
        answers: [
            {
                text: "Immediately",
                low: "",
                high: "",
                multiplier: 2.0
            },
            {
                text: "In more than two weeks",
                low: "",
                high: "",
                multiplier: 1.5
            },
            {
                text: "Flexible timing",
                low: "",
                high: "",
                multiplier: 1.0
            }
        ]
    },
    {
        question: "What type of property is it?",
        answers: [
            {
                text: "Home",
                low: "",
                high: "",
                multiplier: 1.0
            },
            {
                text: "Business",
                low: "",
                high: "",
                multiplier: 1.5
            }
        ]
    },
    {
        question: "Is the property outside of our service areas?",
        answers: [
            {
                text: "Yes",
                low: "",
                high: "",
                multiplier: 1.5
            },
            {
                text: "No",
                low: "",
                high: "",
                multiplier: 1.0
            }
        ]
    },
    {
        question: "How many trees are involved?",
        answers: [
            {
                text: "5+",
                low: "",
                high: "",
                multiplier: 4.8
            },
            {
                text: "4-5",
                low: "",
                high: "",
                multiplier: 3.8
            },
            {
                text: "2-3",
                low: "",
                high: "",
                multiplier: 1.8
            },
            {
                text: "1",
                low: "",
                high: "",
                multiplier: 1.0
            }
        ]
    },
    {
        question: "Which tree services do you need?",
        answers: [
            {
                text: "Tree Trimming",
                low: "255",
                high: "655"
            },
            {
                text: "Tree Removal",
                low: "750",
                high: "1500",
            },
            {
                text: "Stump Removal",
                low: "150",
                high: "500",
            }
        ]
    },
]