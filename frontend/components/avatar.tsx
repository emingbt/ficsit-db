import Link from 'next/link'
import Image from 'next/image'

import type { Pioneer } from '../interfaces'

export default function Avatar({ pioneer }: { pioneer?: Pioneer }) {
  if (!pioneer) {
    return null
  }

  return (
    <Link
      href='/profile'
      className='w-1/2 h-16 lg:w-10 lg:h-10 flex flex-row items-center justify-center gap-2 lg:ml-6'
    >
      <p className='text-white lg:hidden'>{pioneer.name}</p>
      <Image
        src={`/images/avatars/${pioneer.avatar}.png`}
        alt='Avatar'
        width={40}
        height={40}
        className={`rounded-full bg-avatar-${pioneer.color}`}
      />
    </Link>
  )
}