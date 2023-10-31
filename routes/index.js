import { Router } from 'express';
import 'dotenv/config';
import nodemailer from 'nodemailer';

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
    svg_count: [1, 2, 3], // For the star designs
    tile_count: [...Array(7)].map((tile) => {}) // For the side floral tiles
  });
});

router.get('/our-facility', async (req, res, next) => {
  res.render('facility', {
    page: {
      path: '/our-facility',
      title: 'Our Facility',
      canonUrl: getCanonUrl(req.get('host'), req.url),
      description:
        'At Amel Therapy Center, we offer compassionate and specialized support for individuals struggling with addiction and trauma.'
    },
    tile_count: [...Array(15)].map((tile) => {}) // For the side floral tiles
  });
});

router.get('/our-programs', async (req, res, next) => {
  res.render('programs', {
    page: {
      path: '/our-programs',
      title: 'Our Programs',
      canonUrl: getCanonUrl(req.get('host'), req.url),
      description:
        'Amel offers a variety of treatments that are specific to your needs. We value your courage and commitment to your well-being, and we are here to guide and support you every step of the way.'
    },
    svg_count: [1, 2, 3] // For the star designs
  });
});

router.get('/levels-of-care', async (req, res, next) => {
  res.render('care', {
    page: {
      path: '/levels-of-care',
      title: 'Levels Of Care',
      canonUrl: getCanonUrl(req.get('host'), req.url),
      description:
        'Our facility offers care through two different forms, Partial Hospitalization Program (PHP), and Intensive Outpatient Program (IOP). Both structures offer value to the client with different forms of treatment.'
    }
  });
});

router.get('/our-team', async (req, res, next) => {
  res.render('team', {
    page: {
      path: '/our-team',
      title: 'Our Team',
      canonUrl: getCanonUrl(req.get('host'), req.url),
      description:
        'Meet the wonderful professionals who provide our patients with a new life, healed from trauma.'
    }
  });
});

router.get('/about-us', async (req, res, next) => {
  res.render('about', {
    page: {
      path: '/about-us',
      title: 'About Us',
      canonUrl: getCanonUrl(req.get('host'), req.url),
      description:
        'Amel Therapy Center treats the underlying issues of our clients beyond a diagnosis with an innovative mental health recovery center, focused in a scientific holistic and trauma approach to help you in your journey of healing and freedom.'
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
  const params = req.query;

  res.render('contact', {
    page: {
      path: '/contact',
      title: 'Contact',
      canonUrl: getCanonUrl(req.get('host'), req.url),
      description:
        'Contact us today to to learn more about our services, treatment approaches, and the compassionate professionals who make up our team. You can also find information on how to get started on your path to healing.'
    },
    params: !params ? false : params
  });
});

router.post('/contact', async (req, res, next) => {
  const {
    'first-name': firstName,
    'last-name': lastName,
    email,
    phone,
    subject,
    message
  } = req.body;

  try {
    // Owner uses outlook for email, however outlook authentication was not working with nodemailer
    // So a separate gmail account was created solely to be used as a transporter
    // email: ameltherapywebsite@gmail.com
    // pass: Nina@2013

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'ameltherapywebsite@gmail.com',
        pass: 'efoh ktrj xhxe cpqk'
      }
    });

    await transporter.sendMail({
      from: `"New form submission from website" <${email}>`,
      to: 'fcapetillo@ameltherapycenter.com',
      subject: subject
        ? subject
        : 'Amel Therapy Center Website: Form Submission',
      html: `<strong>Name:</strong> ${firstName} ${lastName}<br><strong>Email:</strong> ${email}<br><strong>Phone:</strong> ${phone}<br><strong>Subject:</strong> ${subject}<br><strong>Message:</strong> ${message}`
    });

    res.redirect('/contact?success=true');
  } catch (err) {
    console.error(err);
    res.redirect('/contact?error=true');
  }
});

export default router;
