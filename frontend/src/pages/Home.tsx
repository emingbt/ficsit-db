import React from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import Footer from '../components/footer'

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',

})

const StyledBannerSection = styled.section({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 64,
  height: "50%",
  width: '100%'
})

const StyledBanner = styled.div`
  height: 40vh;
  width: 80%;
  backgroundColor: blue;
  marginTop: 64;
  background-image: url(./banner.jpeg);
  background-position: center;
  background-size: cover;
  border-radius: 16px;
`

const StyledBannerText = styled.div({
  height: "10vh",
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 8,
  backgroundColor: '#43454B',
  marginTop: -64,
  borderWidth: 2,
  borderRadius: 24,
  borderColor: "#F2C800",
  borderStyle: 'solid',
  textAlign: 'center',
  color: 'white',
  fontSize: 42,
})

const StyledNavSection = styled.nav({
  display:'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  height: '75vh',
  backgroundColor: '#141518',
  marginTop: 64
})

const StyledNavItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36%',
  cursor: 'pointer'
})

interface Props {
  imgUrl: string
}

const StyledNavImage = styled.div<Props>`
  height: 48vh;
  width: 100%;
  border-radius: 8px;
  background-color: blue;
  background-image: url(${(props)=>props.imgUrl});
  background-size: cover;
  background-position: center;
  opacity: 0.8;
`

const StyledNavText = styled.div({
  height: "8vh",
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: -32,
  backgroundColor: '#43454B',
  borderWidth: 3,
  borderRadius: 8,
  borderColor: "#F2C800",
  borderStyle: 'solid',
  textAlign: 'center',
  verticalAlign: 'center',
  color: 'white',
  fontSize: 32,
  zIndex: 1
})

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <StyledBannerSection>
        <StyledBanner />
        <StyledBannerText>
          Improve your production line
        </StyledBannerText>
      </StyledBannerSection>
      <StyledNavSection>
        <StyledNavItem>
          <StyledNavImage imgUrl="./items-bg.jpg" />
          <StyledNavText>Items</StyledNavText>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavImage imgUrl="./buildings-bg.jpg" />
          <StyledNavText>Buildings</StyledNavText>
        </StyledNavItem>
      </StyledNavSection>
      <Footer />
    </Wrapper>
  );
}

export default Home