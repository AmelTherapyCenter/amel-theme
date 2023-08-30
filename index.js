import express from "express";
import 'dotenv/config'
import { engine } from "express-handlebars";
import { default as indexRouter } from './routes/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { siteData, getMenu } from './settings_data.js';

const app = express();
const PORT = parseInt(process.env.PORT) || 8080;
const { HOST } = process.env; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Global site info
app.locals.site = await siteData();
app.locals.menus = {
	main_menu: await getMenu("main-menu"),
	footer_menu_one: await getMenu("company"),
	footer_menu_two: await getMenu("services"),
	footer_menu_three: await getMenu("contact")
};
// app.locals.menus = {
// 	main_menu,
// 	footer_menu_one,
// 	footer_menu_two,
// 	footer_menu_three
// };

// Theme layout
app.use(express.static("assets"))
 
// View engine - Handlebars
app.set('views', `${__dirname}/views`);
app.set("view engine", "hbs");
app.engine("hbs", engine({
    defaultLayout: "theme", 
    extname: ".hbs"
}));


// Allow cross-origin request from https://cozyearth.com
// app.use(
// 	"/api",
// 	cors({
// 		origin: "https://cozyearth.com",
// 		methods: "GET, POST, PUT, DELETE",
// 	})
// );

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//     res.header('Access-Control-Allow-Headers', 'Content-Type')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Udundi-Access-Token, Content-Type, Accept')
//     next()
//   })

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nAllow: /\nCrawl-delay: 2\nSitemap: https://browardtreetechs.com/sitemap.xml");
});

app.get('/sitemap.xml', function(req, res) {
	res.sendFile(`${__dirname}/views/sitemap.xml`);
});

// Routes
app.use("/", indexRouter);

// Error handling
app.use((req, res, next) => {
	res.status(404);
	res.render('404', { dark_bg: true });
});

app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('There was an error.')
})

// Port listener
try {
	app.listen(PORT, () => {
		console.log(`Running on ${HOST}:${PORT}`);
	});
} catch (error) {
	console.error("Unable to connect\n", error);
}