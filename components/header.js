import styled from 'styled-components'
import { StyledLine } from './sharedstyles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SearchIcon from '../assets/searchIcon.svg'
import HamburgerIcon from '../assets/hamburgerIcon.svg'
import CloseIcon from '../assets/closeIcon.svg'

export default function Header() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [active, setActive] = useState(false)

  return (
    <Wrapper>
      <HeaderBar>
        <Link href="/">
          <Logo>FiCS<span style={{ color: '#4DACF0' }}>I</span><span style={{ color: '#D79845' }}>T</span>DB</Logo>
        </Link>
        <StyledHamburgerButton onClick={() => setActive(!active)}>
          {active ?
            <StyledCloseIcon/> :
            <StyledHamburgerIcon/>
          }
        </StyledHamburgerButton>
      </HeaderBar>
      <StyledNav active={active} >
        <StyledForm>
          <StyledInput
            placeholder='Search items or buildings'
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <StyledSearchButton onClick={(e) => {
            e.preventDefault()
            if (searchValue.length > 0) {
              router.push(`/search?name=${searchValue}`)
            }
          }}
            aria-label="Search"
          >
            <StyledSearchIcon />
          </StyledSearchButton>
        </StyledForm>
        <Link href="/">
          <StyledText>Home</StyledText>
        </Link>
        <Link href="/items">
          <StyledText>Items</StyledText>
        </Link>
        <Link href="/buildings/production">
          <StyledText>Buildings</StyledText>
        </Link>
      </StyledNav>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #141518;
  padding: 0.5rem 1rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 0.5rem 2rem;
  }
`

const HeaderBar = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.text`
  color: white;
  font-size: clamp(1.25rem, 2vw, 2rem);
  font-family: Industrial Branding;
  cursor: pointer;
  user-select: none;
`

const StyledHamburgerButton = styled.button`
  background: transparent;
  border: 0;

  @media (min-width: 1024px) {
    display: none;
  }
`

const StyledNav = styled.nav`
  display: ${props => props.active? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 3rem;
  left: 0;
  right: 0;
  width: 100%;
  padding: 1rem;
  color: #9BA3A9;
  z-index: 999;
  background-color: #141518;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    justify-content: end;
    position: static;
    gap: 1.5rem;
    padding: 0;
  }
`

const StyledForm = styled.form`
  height: 3rem;
  width: 100%;
  max-width: 40ch;
  min-width: 30ch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const StyledInput = styled.input`
  color: #CCCCCC;
  font-size: 16px;
  background-color: #202125;
  border-width: 1px;
  border-right-width: 0px;
  border-color: #E5AF07;
  height: 100%;
  width: 100%;
  box-shadow: none;
  border-style: solid;
  padding: 0.75rem 1rem;
  outline: none;
  &:focus {
    border-color: #D79845;
  }
`

const StyledSearchButton = styled.button`
  color: #CCCCCC;
  background-color: #D79845;
  height: 100%;
  aspect-ratio: 1 / 1;
  padding: 0 0.25rem;
  background-color: #202125;
  border-width: 1px;
  border-color: #E5AF07;
  border-style: solid;
  outline: none;
  box-shadow: none;
  &:hover {
    background-color: #E5AF07;
    color: #202125;
  }
  cursor: pointer;
`

const StyledText = styled.p`
  font-size: 1.25rem;
  text-align: center;
  width: 100%;
  &:hover {
    color: #CCCCCC;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    width: fit-content;
    margin: 0;
  }
`

const StyledSearchIcon = styled(SearchIcon)`
  font-size: 1.25rem;
`

const StyledHamburgerIcon = styled(HamburgerIcon)`
  font-size: 2rem;
`

const StyledCloseIcon = styled(CloseIcon)`
  font-size: 2rem;
`