const baseUrl = 'https://github.com/chakra-ui/chakra-ui'

const siteConfig = {
  copyright: `Copyright © ${new Date().getFullYear()} creotip. All Rights Reserved.`,
  algolia: {
    apiKey: 'df1dcc41f7b8e5d68e73dd56d1e19701',
    indexName: 'chakra-ui',
    inputSelector: '#algolia-search',
  },
  author: {
    name: 'Ruslan Elishaev',
    github: 'https://github.com/creotip',
    twitter: 'https://twitter.com/thesegunadebayo',
    linkedin: 'https://www.linkedin.com/in/ruslan-elisha-aa6a5912a/',
    email: 'creotip@gmail.com',
  },
  repo: {
    url: baseUrl,
    editUrl: `${baseUrl}/edit/main/website/pages`,
    blobUrl: `${baseUrl}/blob/main`,
  },
  openCollective: {
    url: 'https://opencollective.com/chakra-ui',
  },
  discord: {
    url: 'https://discord.gg/chakra-ui',
  },
  youtube: 'https://www.youtube.com/channel/UC4TmDovH46TB4S0SM0Y4CIg',
  seo: {
    title: 'creotip',
    titleTemplate: '%s | creotip',
    description:
      'A blog about fullstack development. Javascript, react, apollo, microservices and kubernetes',
    siteUrl: 'https://chakra-ui.com',
    twitter: {
      handle: '@chakra-ui',
      site: '@chakra-ui',
      cardType: 'summary_large_image',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://chakra-ui.com',
      title: 'Chakra UI',
      description:
        'Simple, Modular and Accessible UI Components for your React Applications.',
      site_name:
        'Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.',
      images: [
        {
          url: 'https://chakra-ui.com/og-image.png',
          width: 1240,
          height: 480,
          alt: 'Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.',
        },
        {
          url: 'https://chakra-ui.com/twitter-og-image.png',
          width: 1012,
          height: 506,
          alt: 'Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.',
        },
      ],
    },
  },
}

export default siteConfig
