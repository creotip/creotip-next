import { NextApiRequest, NextApiResponse } from 'next'
import { getStaticProps } from '../posts/[slug]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { post } = req.query
  const { props } = await getStaticProps({ params: { slug: post as string } })
  res.json(props)
}
