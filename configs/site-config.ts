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
      'A fullstack development blog. Javascript, react, apollo, microservices and kubernetes',
    siteUrl: 'https://creotip.io',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://creotip.io',
      title: 'Creotip',
      description:
        'A fullstack development blog. Javascript, react, apollo, microservices and kubernetes',
      site_name: 'A Blog for FullStack Comrades',
      images: [
        {
          url: 'https://creotip.io/creotip-og-dark.png',
          width: 1240,
          height: 480,
          alt: 'A fullstack development blog.',
        },
        {
          url: 'https://creotip.io/creotip-og-dark.png',
          width: 1012,
          height: 506,
          alt: 'A fullstack development blog.',
        },
      ],
    },
  },
}

export default siteConfig
