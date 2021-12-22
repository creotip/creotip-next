import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type { Author } from '../types/author'
import { Box, Flex } from '@chakra-ui/react'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
}

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <Flex mb={5} alignItems="center" fontSize="sm">
        <Avatar name={author.name} picture={author.picture} />
        <DateFormatter dateString={date} />
      </Flex>

      <Box mb={8}>
        <CoverImage title={title} src={coverImage} />
      </Box>
      <div className="max-w-2xl mx-auto">
        {/*<div className="block md:hidden mb-6">*/}
        {/*  <Avatar name={author.name} picture={author.picture} />*/}
        {/*</div>*/}
      </div>
    </>
  )
}

export default PostHeader
