import styled from 'styled-components'

const Wrapper = styled.header({
  width: '100%',
})

const HeaderBar = styled.div({
  height: 100,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
})

const Logo = styled.text({
  color: 'white',
  fontSize: 40,
  paddingLeft: 64,
  fontFamily: 'Industrial Branding',
  cursor: 'pointer'
})

const StyledNav = styled.nav({
  width: '50%',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  color: '#9BA3A9',
  fontSize: 24,
  fontWeight: 500,
  paddingBottom: 8
})

const StyledInput = styled.input({
  color: '#CCCCCC',
  fontSize: 16,
  backgroundColor: '#202125',
  borderWidth: 1,
  borderColor: '#F2C800',
  borderRadius: 4,
  height: 52,
  width: 300,
  boxShadow: 'none',
  borderStyle: 'solid',
  paddingLeft: 16,
  outline: 'none'
})

const StyledLink = styled.a({
  ":hover": {
    color: '#CCCCCC',
    cursor: 'pointer'
  }
})

function Header() {
  return (
    <Wrapper>
      <HeaderBar>
        <Logo>FiCS<span style={{color: '#4DACF0'}}>I</span><span style={{color: '#D79845'}}>T</span>DB</Logo>
        <StyledNav>
          <StyledInput placeholder='Search items'/>
          <StyledLink>Home</StyledLink>
          <StyledLink>Items</StyledLink>
          <StyledLink>Buildings</StyledLink>
        </StyledNav>
      </HeaderBar>
      <div style={{flex: 1, height: '1px', backgroundColor: '#E5AF07'}} />
    </Wrapper>
  )
}

export default Header;