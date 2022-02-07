import React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import siteConfig from 'configs/site-config'

export interface SEOProps
  extends Pick<
    NextSeoProps,
    'title' | 'description' | 'openGraph' | 'twitter' | 'canonical'
  > {}

const SEO = ({
  title,
  description,
  openGraph,
  twitter,
  ...props
}: SEOProps) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ title, description, ...openGraph }}
    titleTemplate={siteConfig.seo.titleTemplate}
    twitter={twitter}
    {...props}
  />
)

export default SEO
