import styled from 'styled-components'
import { StyledLine } from './sharedstyles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SearchIcon from './searchIcon'
import { useState } from 'react'

export default function Header() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  return (
    <Wrapper>
      <HeaderBar>
        <Link href="/">
          <Logo>FiCS<span style={{ color: '#4DACF0' }}>I</span><span style={{ color: '#D79845' }}>T</span>DB</Logo>
        </Link>
        <StyledNav>
          <StyledForm>
            <StyledInput id='itemName' placeholder='Search items' onChange={(e) => setSearchValue(e.target.value)} />
            <StyledButton onClick={(e) => {
              e.preventDefault()
              if (searchValue.length > 0 ) {
                router.push(`/search?name=${searchValue}`)
              }
            }} >
              <SearchIcon />
            </StyledButton>
          </StyledForm>
          <Link href="/">
            <StyledLink>Home</StyledLink>
          </Link>
          <Link href="/items">
            <StyledLink>Items</StyledLink>
          </Link>
          <Link href="/buildings/production">
            <StyledLink>Buildings</StyledLink>
          </Link>
        </StyledNav>
      </HeaderBar>
      <StyledLine color={'#E5AF07'} />
    </Wrapper>
  )
}

const Wrapper = styled.header`
  width: 100%;
`

const HeaderBar = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.text`
  color: white;
  font-size: 40px;
  padding-left: 64px;
  font-family: Industrial Branding;
  cursor: pointer;
  user-select: none;
`

const StyledNav = styled.nav`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #9BA3A9;
  font-size: 24px;
  font-weight: 500px;
`

const StyledForm = styled.form`
  height: 3.25rem;
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
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  height: 100%;
  width: 275px;
  box-shadow: none;
  border-style: solid;
  padding-left: 16px;
  outline: none;
  &:focus {
    border-color: #D79845;
  }
`

const StyledButton = styled.button`
  color: #CCCCCC;
  background-color: #D79845;
  height: 100%;
  aspect-ratio: 1 / 1;
  padding: 0 0.25rem;
  background-color: #202125;
  border-width: 1px;
  border-color: #E5AF07;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-style: solid;
  outline: none;
  box-shadow: none;
  &:hover {
    background-color: #E5AF07;
    color: #202125;
  }
  cursor: pointer;
`

const StyledLink = styled.p`
  &:hover {
    color: #CCCCCC;
    cursor: pointer;
  }
`