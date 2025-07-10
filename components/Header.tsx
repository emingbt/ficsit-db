"use client"

import Link from 'next/link'
import SearchInput from './SearchInput'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import HamburgerIcon from '../assets/hamburgerIcon.svg'
import CloseIcon from '../assets/closeIcon.svg'

import AuthNavigation from './AuthNav'

export default function Header() {
  const router = usePathname()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(false)
  }, [router])

  return (
    <header className='w-full h-16 relative lg:fixed top-0 flex flex-col flex-shrink-0
      items-center justify-between bg-dark-bg px-8 pt-[18px] z-50
      lg:flex-row lg:pt-0 shadow-xl'
    >
      <div className='flex flex-row items-center justify-between w-full lg:w-1/5'>
        <Link href="/">
          <p className='font-logo select-none size-logo cursor-pointer text-xl'>
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
      <nav className='w-4/5 h-full hidden lg:flex flex-row flex-shrink-0 items-center justify-end'>
        <SearchInput />
        <Link href="/items" className='w-20 ml-6 hover:text-main-orange'>
          <p className='select-none cursor-pointer h-full text-center'>Items</p>
        </Link>
        <Link href="/buildings?category=production" className='w-20 ml-6 hover:text-main-orange'>
          <p className='select-none cursor-pointer h-full text-center'>Buildings</p>
        </Link>
        <Link href="/blueprints" className='w-20 ml-6 hover:text-logo-blue'>
          <p className='select-none cursor-pointer h-full text-center'>Blueprints</p>
        </Link>
        <Link href="/blueprint-packs" className='w-32 ml-6 hover:text-main-orange'>
          <p className='select-none cursor-pointer h-full text-center'>Blueprint Packs</p>
        </Link>
        <div className='w-0.5 h-12 bg-main-orange ml-8' />
        <AuthNavigation />
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
            <Link href='/blueprints' className='w-60 pt-6'>
              <p className='h-full text-center'>Blueprints</p>
            </Link>
            <Link href='/blueprint-packs' className='w-60 pt-6'>
              <p className='h-full text-center'>Blueprint Packs</p>
            </Link>
            <div className='w-full h-0.5 bg-main-orange mt-8' />
            <div className='w-full flex flex-row justify-center mt-6'>
              <AuthNavigation />
            </div>
          </nav>
        </div>
      }
    </header>
  )
}