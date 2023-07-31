import express from "express";
import 'dotenv/config'
import { engine } from "express-handlebars";
import { default as indexRouter } from './routes/index.js';
import { default as servicesRouter } from './api/services/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { siteData, main_menu } from './settings_data.js';

const app = express();
const PORT = parseInt(process.env.PORT) || 8080;
const { HOST } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Global site info
app.locals.site = await siteData();
app.locals.menus = {
	main_menu
};

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

// Routes
app.use("/", indexRouter);
app.use("/api/services/", servicesRouter);

// Port listener
try {
	app.listen(PORT, () => {
		console.log(`Running on ${HOST}:${PORT}`);
	});
} catch (error) {
	console.error("Unable to connect\n", error);
}