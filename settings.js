export const site = {
  name: 'Amel Therapy Center',
  location: '1622 North Federal Highway, Lake Worth, FL 33460',
  social_media: [],
  details: [
    {
      title: 'Hours Of Opertation',
      information: [
        {
          days: 'Mon - Thurs',
          hours: ''
        },
        {
          days: 'Fri - Sat',
          hours: ''
        },
        {
          days: 'Sun',
          hours: ''
        }
      ]
    }
  ],
  contact: [
    {
      title: 'Email',
      type: 'email',
      information: 'info@amel.com'
    },
    {
      title: 'Phone',
      type: 'tel',
      information: '(561) 847-3242'
    }
  ],
  seo_title: 'Begin your path to sobriety',
  seo_description:
    'Amel is a bi-lingual Spanish and English speaking substance abuse/mental health therapy center focused on offering a safe space to begin your path to sobriety, utilizing unique, holistic approaches, specialized care, and treatment plans tailored to your needs.'
};

export const menus = {
  main_menu: [
    {
      title: 'Home',
      handle: '/'
    },
    {
      title: 'Who We Are',
      handle: '/who-we-are',
      children: [
        {
          title: 'About Us',
          handle: '/about-us'
        },
        {
          title: 'Our Team',
          handle: '/our-team'
        },
        {
          title: 'Our Facility',
          handle: '/our-facility'
        },
        {
          title: 'Resources',
          handle: '/resources'
        }
      ]
    },
    {
      title: 'What We Do',
      handle: '/what-we-do',
      children: [
        {
          title: 'Levels Of Care',
          handle: '/levels-of-care'
        },
        {
          title: 'Our Programs',
          handle: '/our-programs'
        }
      ]
    },
    {
      title: 'Contact',
      handle: '/contact'
    }
  ]
};

export const theme = {
  page_width: '1440'
};
