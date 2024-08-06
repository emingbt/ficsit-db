import Image from 'next/image'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { getPropertiesFromIdToken } from '../utils/kinde'

export default function AuthNavigation() {
  const { isAuthenticated, getIdToken } = useKindeBrowserClient()
  const idToken = getIdToken()
  const pioneer = getPropertiesFromIdToken(idToken || undefined)

  return (
    <>
      {
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
          pioneer ?
            <LogoutLink
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
            </LogoutLink> :
            <LogoutLink
              className='w-32 lg:w-16 lg:ml-6 lg:hover:text-main-orange'>
              <p className='h-full text-center user-select-none lg:cursor-pointer'>Logout</p>
            </LogoutLink>
      }
    </>
  )
}