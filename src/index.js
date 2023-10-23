import express from 'express';
import 'dotenv/config';
import expressHbs from 'express-handlebars';
import { default as indexRouter } from './routes/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { site, menus, theme } from './settings.js';

const app = express();
const PORT = parseInt(process.env.PORT) || 8080;
const { HOST, NODE_ENV } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Global site info
app.locals.site = site;
app.locals.theme = theme;
app.locals.menus = {
  main_menu: menus.main_menu
};
app.locals.dev_envrionment = NODE_ENV === 'development' ? true : false;

// Static assets
app.use(express.static('public'));

// View engine - Handlebars
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  expressHbs.engine({
    defaultLayout: 'theme',
    extname: '.hbs'
  })
);

const hbs = expressHbs.create({});

hbs.handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

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

// app.get('/robots.txt', function (req, res) {
// 	res.type('text/plain');
// 	res.send(
// 		'User-agent: *\nAllow: /\nCrawl-delay: 2\nSitemap: https://browardtreetechs.com/sitemap.xml'
// 	);
// });

// app.get('/sitemap.xml', function (req, res) {
// 	res.sendFile(`${__dirname}/views/sitemap.xml`);
// });

// Routes
app.use('/', indexRouter);

// Error handling
app.use((req, res, next) => {
  res.status(404);
  res.render('404', {
    dark_bg: true,
    page: {
      title: 'Page Not Found',
      description: "We're sorry but this page could not be found"
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('There was an error.');
});

// Port listener
try {
  app.listen(PORT, () => {
    console.log(`Running on ${HOST}:${PORT}`);
  });
} catch (error) {
  console.error('Unable to connect\n', error);
}

module.exports = app;
