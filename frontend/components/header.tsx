"use client"

import Link from 'next/link'
import SearchInput from './searchInput'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

import HamburgerIcon from '../assets/hamburgerIcon.svg'
import CloseIcon from '../assets/closeIcon.svg'
import Avatar from './avatar'

import type { Pioneer } from '../interfaces'

export default function Header({ pioneer }: { pioneer?: Pioneer }) {
  const router = usePathname()
  const [active, setActive] = useState(false)
  const { isAuthenticated } = useKindeBrowserClient()

  useEffect(() => {
    setActive(false)
  }, [router])

  return (
    <header className='w-full h-16 relative lg:fixed top-0 flex flex-col
      items-center justify-between bg-dark-bg px-8 pt-[18px] z-50
      lg:flex-row lg:pt-0 shadow-xl'
    >
      <div className='flex flex-row items-center justify-between w-full lg:w-1/5'>
        <Link href="/">
          <p className='font-logo user-select-none size-logo cursor-pointer text-xl'>
            FiCS<span className='text-logo-blue ml-[-2px]'>I</span><span className='text-main-orange ml-[-6px]'>T</span> DB
          </p>
        </Link>

        {
          active ?
            <CloseIcon
              className='w-6 h-6 ml-4 cursor-pointer lg:hidden'
              onClick={() => setActive(!active)}
            /> :
            <HamburgerIcon
              className='w-6 h-6 ml-4 cursor-pointer lg:hidden'
              onClick={() => setActive(!active)}
            />
        }

      </div>
      <nav className='hidden lg:flex flex-row items-center justify-end h-8 w-4/5'>
        <SearchInput />
        <Link href="/items" className='w-20 ml-6 hover:text-main-orange'>
          <p className='user-select-none cursor-pointer h-full text-center'>Items</p>
        </Link>
        <Link href="/buildings?category=production" className='w-20 ml-6 hover:text-main-orange'>
          <p className='user-select-none cursor-pointer h-full text-center'>Buildings</p>
        </Link>
        {/* <Link href="/blueprints" className='w-20 ml-6 hover:text-main-orange'>
          <p className='user-select-none cursor-pointer h-full text-center'>Blueprints</p>
        </Link> */}
        <div className='w-0.5 h-12 bg-main-orange ml-8' />
        {
          pioneer ?
            <Avatar pioneer={pioneer} /> :
            isAuthenticated ?
              <LogoutLink
                postLogoutRedirectURL='/'
                className='w-16 ml-6 hover:text-main-orange'>
                <p className='user-select-none cursor-pointer h-full text-center'>Logout</p>
              </LogoutLink> :
              <>
                <RegisterLink
                  postLoginRedirectURL='/api/auth'
                  className='w-20 ml-6 hover:text-main-orange'
                >
                  <p className='user-select-none cursor-pointer h-full text-center'>Sign up</p>
                </RegisterLink>
                <LoginLink
                  postLoginRedirectURL='/api/auth'
                  className='w-16 ml-6 hover:text-main-orange'
                >
                  <p className='user-select-none cursor-pointer h-full text-center'>Login</p>
                </LoginLink>
              </>
        }
      </nav>

      {
        active &&
        <div className='flex flex-col items-center w-full absolute top-16 bg-dark-bg pt-6 pb-8 lg:hidden'>
          <nav className='flex flex-col items-center w-72 text-xl'>
            <SearchInput />
            <Link href='/items' className='w-60 pt-6'>
              <p className='h-full text-center'>Items</p>
            </Link>
            <Link href='/buildings?category=production' className='w-60 pt-6'>
              <p className='h-full text-center'>Buildings</p>
            </Link>
            {/* <Link href='/blueprints' className='w-60 pt-6'>
              <p className='h-full text-center'>Blueprints</p>
            </Link> */}
            <div className='w-full h-0.5 bg-main-orange mt-8' />
            <div className='w-full flex flex-row justify-center'>
              {
                pioneer ?
                  <Avatar pioneer={pioneer} /> :
                  isAuthenticated ?
                    <LogoutLink
                      postLogoutRedirectURL='/'
                      className='w-32 pt-8'
                    >
                      <p className='h-full text-center'>Logout</p>
                    </LogoutLink> :
                    <>
                      <RegisterLink
                        postLoginRedirectURL='/api/auth'
                        className='w-32 pt-8'
                      >
                        <p className='h-full text-center'>Sign up</p>
                      </RegisterLink>
                      <LoginLink
                        postLoginRedirectURL='/api/auth'
                        className='w-32 pt-8'
                      >
                        <p className='h-full text-center'>Login</p>
                      </LoginLink>
                    </>
              }
            </div>
          </nav>
        </div>
      }
    </header>
  )
}