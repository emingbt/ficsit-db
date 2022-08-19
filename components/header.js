import styled from 'styled-components'
import { StyledLine } from './sharedstyles'
import Link from 'next/link'

export default function Header() {
  return (
    <Wrapper>
      <HeaderBar>
        <Link href="/">
          <Logo>FiCS<span style={{ color: '#4DACF0' }}>I</span><span style={{ color: '#D79845' }}>T</span>DB</Logo>
        </Link>
        <StyledNav>
          <StyledInput placeholder='Search items' />
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

const StyledInput = styled.input`
  color: #CCCCCC;
  font-size: 16px;
  background-color: #202125;
  border-width: 1px;
  border-color: #E5AF07;
  border-radius: 4px;
  height: 52px;
  width: 300px;
  box-shadow: none;
  border-style: solid;
  padding-left: 16px;
  outline: none;
  &:focus {
    border-color: #D79845;
  }
`

const StyledLink = styled.a`
  &:hover {
    color: #CCCCCC;
    cursor: pointer;
  }
`