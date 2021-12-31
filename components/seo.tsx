import React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import siteConfig from 'configs/site-config'

export interface SEOProps
  extends Pick<NextSeoProps, 'title' | 'description' | 'openGraph'> {}

const SEO = ({ title, description, openGraph, ...props }: SEOProps) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ title, description, ...openGraph }}
    titleTemplate={siteConfig.seo.titleTemplate}
    {...props}
  />
)

export default SEO
