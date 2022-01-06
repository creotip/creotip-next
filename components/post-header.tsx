import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type { Author } from 'types/author'
import { Box, Flex } from '@chakra-ui/react'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
  base64: string
}

const PostHeader = ({ title, coverImage, date, author, base64 }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <Flex mb={5} alignItems="center" fontSize="sm">
        <Avatar name={author.name} picture={author.picture} />
        <DateFormatter dateString={date} />
      </Flex>

      <Box mb={8}>
        <CoverImage title={title} src={coverImage} base64={base64} />
      </Box>
    </>
  )
}

export default PostHeader
