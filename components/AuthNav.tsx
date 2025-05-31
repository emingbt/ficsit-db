import Image from 'next/image'
import Link from 'next/link'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { getPropertiesFromAccessToken } from '../utils/kinde'
import { usePioneerStore } from '../utils/zustand'

export default function AuthNavigation() {
  const { isAuthenticated, getAccessToken } = useKindeBrowserClient()
  let pioneer

  // fetch the pioneer data from the store as pioneer
  const { name, avatar, color, setAvatar, setColor, setName } = usePioneerStore((state) => state)
  pioneer = { name, avatar, color }

  // if the pioneer data is not available, get it from the access token
  if (!name || !avatar || !color) {
    const accessToken = getAccessToken()
    pioneer = getPropertiesFromAccessToken(accessToken || undefined)

    if (pioneer) {
      // set the pioneer data in the store
      setName(pioneer.name)
      setAvatar(pioneer.avatar)
      setColor(pioneer.color)
    }
  }

  return (
    <>
      {

        pioneer ?
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
          </Link> :
          !isAuthenticated ?
            <>
              <RegisterLink
                postLoginRedirectURL='/api/auth'
                className='w-32 lg:w-20 lg:ml-6 lg:hover:text-main-orange'
              >
                <p className='h-full text-center user-select-none lg:cursor-pointer'>Sign up</p>
              </RegisterLink>
              <LoginLink
                postLoginRedirectURL='/api/auth'
                className='w-32 lg:w-16 lg:ml-6 lg:hover:text-main-orange'
              >
                <p className='h-full text-center user-select-none lg:cursor-pointer'>Login</p>
              </LoginLink>
            </> :
            <LogoutLink
              className='w-32 lg:w-16 lg:ml-6 lg:hover:text-main-orange'>
              <p className='h-full text-center user-select-none lg:cursor-pointer'>Logout</p>
            </LogoutLink>
      }
    </>
  )
}