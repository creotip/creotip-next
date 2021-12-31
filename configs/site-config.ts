const baseUrl = 'https://github.com/creotip'

const siteConfig = {
  copyright: `Copyright © ${new Date().getFullYear()} creotip. All Rights Reserved.`,
  author: {
    name: 'Ruslan Elishaev',
    github: 'https://github.com/creotip',
    linkedin: 'https://www.linkedin.com/in/ruslan-elisha-aa6a5912a/',
    email: 'creotip@gmail.com',
  },
  repo: {
    url: baseUrl,
    editUrl: `${baseUrl}/edit/main/website/pages`,
    blobUrl: `${baseUrl}/blob/main`,
  },
  seo: {
    title: 'creotip - A blog for fullstack comrades',
    titleTemplate: '%s | creotip',
    description:
      'A blog about fullstack development. Javascript, react, apollo, microservices and kubernetes',
    siteUrl: 'https://creotip.io',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://creotip.io',
      title: 'Creotip',
      description:
        'A blog about fullstack development. Javascript, react, apollo, microservices and kubernetes',
      site_name:
        'creotip: A blog about fullstack development. Javascript, react, apollo, microservices and kubernetes',
      images: [
        {
          url: 'https://chakra-ui.com/og-image.png',
          width: 1240,
          height: 480,
          alt: 'creotip: A blog about fullstack development. Javascript, react, apollo, microservices and kubernetes',
        },
        {
          url: 'https://chakra-ui.com/twitter-og-image.png',
          width: 1012,
          height: 506,
          alt: 'creotip: A blog about fullstack development. Javascript, react, apollo, microservices and kubernetes',
        },
      ],
    },
  },
}

export default siteConfig
