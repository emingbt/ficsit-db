"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SearchInput from './searchInput'
import HamburgerIcon from '../assets/hamburgerIcon.svg'
import CloseIcon from '../assets/closeIcon.svg'
import { IsActive } from '../interfaces/styledComponents'

export default function Header() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(false)
  }, [router])

  return (
    <header className='w-full h-16 flex flex-col items-center justify-between bg-dark-bg relative px-8 pt-[18px] z-50 lg:flex-row lg:pt-0'>
      <div className='flex flex-row items-center justify-between w-full lg:w-1/5'>
        <Link href="/">
          <p className='font-logo user-select-none size-logo cursor-pointer text-xl'>
            FiCS<span className='text-logo-blue'>I</span><span className='text-main-orange'>T</span> DB
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
        <Link href="/buildings" className='w-20 ml-6 hover:text-main-orange'>
          <p className='user-select-none cursor-pointer h-full text-center'>Buildings</p>
        </Link>
        <Link href="/blueprints" className='w-20 ml-6 hover:text-main-orange'>
          <p className='user-select-none cursor-pointer h-full text-center'>Blueprints</p>
        </Link>
        <div className='w-0.5 h-12 bg-main-orange ml-8' />
        <Link href="/register" className='w-20 ml-6 hover:text-main-orange'>
          <p className='user-select-none cursor-pointer h-full text-center'>Sign up</p>
        </Link>
        <Link href="/login" className='w-16 ml-6 hover:text-main-orange'>
          <p className='user-select-none cursor-pointer h-full text-center'>Login</p>
        </Link>
      </nav>

      {
        active &&
        <div className='flex flex-col items-center w-full absolute top-16 bg-dark-bg pt-6 pb-8 lg:hidden'>
          <nav className='flex flex-col items-center w-72 text-xl'>
            <SearchInput />
            <Link href='/items' className='w-60 pt-6'>
              <p className='h-full text-center'>Items</p>
            </Link>
            <Link href='/buildings' className='w-60 pt-6'>
              <p className='h-full text-center'>Buildings</p>
            </Link>
            <Link href='/blueprints' className='w-60 pt-6'>
              <p className='h-full text-center'>Blueprints</p>
            </Link>
            <div className='w-full h-0.5 bg-main-orange mt-8' />
            <div className='w-full flex flex-row justify-between'>
              <Link href='/register' className='w-32 pt-8'>
                <p className='h-full text-center'>Sign up</p>
              </Link>
              <Link href='/login' className='w-32 pt-8'>
                <p className='h-full text-center'>Login</p>
              </Link>
            </div>
          </nav>
        </div>
      }
    </header>
    // <Wrapper>
    //   <HeaderBar>
    //     <Link href="/" legacyBehavior>
    //       <Logo>FiCS<span style={{ color: '#4DACF0' }}>I</span><span style={{ color: '#D79845' }}>T</span>DB</Logo>
    //     </Link>
    //     <StyledHamburgerButton
    //       onClick={() => setActive(!active)}
    //       aria-label="Navbar"
    //     >
    //       {active ?
    //         <StyledCloseIcon /> :
    //         <StyledHamburgerIcon />
    //       }
    //     </StyledHamburgerButton>
    //   </HeaderBar>
    //   <StyledNav isActive={active} >
    //     <StyledForm>
    //       <StyledInput
    //         placeholder='Search items or buildings'
    //         onChange={(e) => setSearchValue(e.target.value)}
    //       />
    //       <StyledSearchButton onClick={(e) => {
    //         e.preventDefault()
    //         if (searchValue.length > 0) {
    //           router.push(`/search?name=${searchValue}`)
    //         }
    //       }}
    //         aria-label="Search"
    //       >
    //         <StyledSearchIcon />
    //       </StyledSearchButton>
    //     </StyledForm>
    //     <Link href="/" legacyBehavior>
    //       <StyledText>Home</StyledText>
    //     </Link>
    //     <Link href="/items" legacyBehavior>
    //       <StyledText>Items</StyledText>
    //     </Link>
    //     <Link href="/buildings/production" legacyBehavior>
    //       <StyledText>Buildings</StyledText>
    //     </Link>
    //   </StyledNav>
    // </Wrapper>
  )
}

// const Wrapper = styled.header`
//   width: 100%;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background-color: #141518;
//   padding: 0.5rem 1rem;

//   @media (min-width: 1024px) {
//     flex-direction: row;
//     padding: 0.5rem 2rem;
//   }
// `

// const HeaderBar = styled.div`
//   height: 3rem;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `

// const Logo = styled.text`
//   color: white;
//   font-size: clamp(1.25rem, 2vw, 2rem);
//   font-family: Industrial Branding;
//   cursor: pointer;
//   user-select: none;
// `

// const StyledHamburgerButton = styled.button`
//   background: transparent;
//   border: 0;
//   padding: 0;
//   cursor: pointer;

//   @media (min-width: 1024px) {
//     display: none;
//   }
// `

// const StyledNav = styled.nav<IsActive>`
//   display: ${props => props.isActive ? 'flex' : 'none'};
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   top: 3rem;
//   left: 0;
//   right: 0;
//   width: 100%;
//   padding: 1rem;
//   color: #9BA3A9;
//   z-index: 999;
//   background-color: #141518;

//   @media (min-width: 1024px) {
//     display: flex;
//     flex-direction: row;
//     -webkit-justify-content: flex-end;
//     justify-content: flex-end;
//     position: static;
//     gap: 1.5rem;
//     padding: 0;
//   }
// `

// const StyledForm = styled.form`
//   height: 3rem;
//   width: 100%;
//   max-width: 40ch;
//   min-width: 30ch;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `

// const StyledInput = styled.input`
//   color: #CCCCCC;
//   font-size: 16px;
//   background-color: #202125;
//   border-width: 1px;
//   border-right-width: 0px;
//   border-radius: 0;
//   border-color: #E5AF07;
//   height: 100%;
//   width: calc(100% - 3rem);
//   box-shadow: none;
//   border-style: solid;
//   padding: 0.75rem 1rem;
//   outline: none;
//   &:focus {
//     border-color: #D79845;
//   }
// `

// const StyledSearchButton = styled.button`
//   color: #CCCCCC;
//   background-color: #D79845;
//   height: 100%;
//   width: 3rem;
//   padding: 0 0.25rem;
//   background-color: #202125;
//   border-width: 1px;
//   border-color: #E5AF07;
//   border-style: solid;
//   outline: none;
//   box-shadow: none;
//   &:hover {
//     background-color: #E5AF07;
//     color: #202125;
//   }
//   cursor: pointer;
// `

// const StyledText = styled.p`
//   font-size: 1.25rem;
//   text-align: center;
//   width: 100%;
//   &:hover {
//     color: #CCCCCC;
//     cursor: pointer;
//   }

//   @media (min-width: 1024px) {
//     width: fit-content;
//     margin: 0;
//   }
// `

// const StyledSearchIcon = styled(SearchIcon)`
//   font-size: 1.25rem;
// `

// const StyledHamburgerIcon = styled(HamburgerIcon)`
//   font-size: 2rem;
// `

// const StyledCloseIcon = styled(CloseIcon)`
//   font-size: 2rem;
// `