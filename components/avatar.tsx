import Image from 'next/image'

type Props = {
  name: string
  picture: string
}

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      {/*<Image src={picture} layout="fill" alt={name} />*/}
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
