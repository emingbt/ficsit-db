"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { getPropertiesFromAccessToken } from '../utils/kinde'
import { usePioneerStore } from '../utils/zustand'
import { usePathname } from 'next/navigation'

export default function AuthNavigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { isAuthenticated, getAccessToken } = useKindeBrowserClient()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Fetch the pioneer data from the store as pioneer
  const { name, avatar, color, setAvatar, setName, setColor, resetStore } = usePioneerStore((state) => state)
  const pioneer = { name, avatar, color }

  // If the store is empty, fetch the pioneer data from the access token
  useEffect(() => {
    if (!isAuthenticated) {
      setName('')
      setAvatar('')
      setColor('')
      return
    }

    if ((!name || !avatar || !color)) {
      const accessToken = getAccessToken()
      const pioneerFromToken = getPropertiesFromAccessToken(accessToken || undefined)

      if (!pioneerFromToken) return

      setName(pioneerFromToken.name)
      setAvatar(pioneerFromToken.avatar)
      setColor(pioneerFromToken.color)
    }
  }, [isAuthenticated])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false)
  }, [pathname])

  return (
    <>
      {
        checkIfPioneerExists(pioneer) ? (
          <div className='h-full flex-shrink-0'>
            <Link
              href={`/pioneers/${pioneer.name}`}
              className='h-16 lg:w-10 lg:h-10 flex lg:hidden flex-row items-center justify-center gap-2 lg:ml-6'
            >
              <p className='text-white'>{pioneer.name}</p>
              <Image
                src={`/images/avatars/${pioneer.avatar}.png`}
                alt={`${pioneer.name}'s avatar`}
                width={40}
                height={40}
                className={`rounded-full bg-avatar-${pioneer.color}`}
              />
            </Link>
            <Link
              href='/settings'
              className='h-16 lg:w-10 lg:h-10 flex lg:hidden items-center justify-center gap-2 lg:ml-6'
            >
              <p className='text-white'>Settings</p>
            </Link>
            <LogoutLink
              className='h-16 lg:w-10 lg:h-10 flex lg:hidden items-center justify-center gap-2 lg:ml-6'
              onClick={() => resetStore()}
            >
              <p className='text-rose-500'>Logout</p>
            </LogoutLink>

            <div ref={dropdownRef} className='h-full hidden lg:flex items-center relative gap-2 ml-6'>
              <Image
                src={`/images/avatars/${pioneer.avatar}.png`}
                alt={`${pioneer.name}'s avatar`}
                width={40}
                height={40}
                className={`rounded-full bg-avatar-${pioneer.color} cursor-pointer outline ${isDropdownOpen && `outline-2  outline-offset-2 outline-avatar-${pioneer.color}`}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {
                isDropdownOpen && <AvatarDropdown pioneer={pioneer} />
              }
            </div>
          </div>
        ) : (
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
              className='w-32 lg:w-16 lg:ml-6 lg:hover:text-main-orange'
              onClick={() => resetStore()}
            >
              <p className='h-full text-center user-select-none lg:cursor-pointer'>Logout</p>
            </LogoutLink>
        )
      }
    </>
  )
}

function AvatarDropdown({ pioneer }: {
  pioneer: {
    name: string
    avatar: string
    color: string
  }
}) {
  const { resetStore } = usePioneerStore((state) => state)

  return (
    <div className={`absolute top-0 right-0 mt-16 w-24 bg-dark-bg rounded-b-md shadow-sm shadow-avatar-${pioneer.color} z-10`}>
      <Link href={`/pioneers/${pioneer.name}`} className='block px-4 py-2 text-gray-300 hover:bg-main-bg' >
        Profile
      </Link>
      <Link href='/settings' className='block px-4 py-2 text-gray-300 hover:bg-main-bg' >
        Settings
      </Link>
      <LogoutLink className='block px-4 py-2 text-red-500 rounded-b-md hover:bg-main-bg'
        onClick={() => resetStore()}
      >
        Logout
      </LogoutLink>
    </div>
  )
}

function checkIfPioneerExists(pioneer: { name: string, avatar: string, color: string }) {
  return !!pioneer && !!pioneer.name && !!pioneer.avatar && !!pioneer.color
}