import { Router } from 'express';
import 'dotenv/config';

const router = Router();

const getCanonUrl = (host, path) => {
  host = host.includes('www.') ? host : `www.${host}`;
  path = path.split('?');
  return `https://${host}${path[0]}`;
};

router.get('/', async (req, res, next) => {
  res.render('index', {
    page: {
      path: '/',
      canonUrl: getCanonUrl(req.get('host'), req.url)
    },
    svg_count: [1, 2, 3],
    tile_count: [
      { mobile: false },
      { mobile: false },
      { mobile: false },
      { mobile: false },
      { mobile: false },
      { mobile: false },
      { mobile: true },
      { mobile: true },
      { mobile: true },
      { mobile: true }
    ]
  });
});

router.get('/about-us', async (req, res, next) => {
  res.render('about', {
    page: {
      path: '/about-us',
      canonUrl: getCanonUrl(req.get('host'), req.url)
    }
  });
});

router.get('/resources', async (req, res, next) => {
  res.render('resources', {
    page: {
      path: '/resources',
      title: 'Resources',
      canonUrl: getCanonUrl(req.get('host'), req.url),
      description:
        'At Amel, we are focused on developing an individualized treatment program that will give our clients a much better opportunity to maintain long term sobriety and a balanced mental health.'
    }
  });
});

router.get('/contact', async (req, res, next) => {
  res.render('contact', {
    page: {
      path: '/contact',
      title: 'Contact',
      canonUrl: getCanonUrl(req.get('host'), req.url),
      description:
        'Contact us today to to learn more about our services, treatment approaches, and the compassionate professionals who make up our team. You can also find information on how to get started on your path to healing.'
    }
  });
});

export default router;
