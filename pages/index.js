import { Container, Main } from '../components/sharedstyles'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

import bannerImg from '/public/images/banner.jpeg'
import itemsBg from '/public/images/items-bg.jpg'
import buildingBg from '/public/images/buildings-bg.jpg'

export default function Home() {
  return (
    <Container>
      <Main>
        <StyledBannerSection>
          <StyledBannerContainer>
            <StyledBackgroundImage
              src={bannerImg}
              layout="fill"
              objectFit='cover'
              alt="Banner"
              priority
            />
          </StyledBannerContainer>
          <StyledBannerText>
            Improve your production line
          </StyledBannerText>
        </StyledBannerSection>
        <StyledNavSection>
          <Link href="/items">
            <StyledNavItem>
              <StyledNavImage>
                <StyledBackgroundImage
                  src={itemsBg}
                  layout="fill"
                  objectFit='cover'
                  alt="Items"
                />
              </StyledNavImage>
              <StyledNavText>Items</StyledNavText>
            </StyledNavItem>
          </Link>
          <Link href="/buildings/production">
            <StyledNavItem>
              <StyledNavImage>
                <StyledBackgroundImage
                  src={buildingBg}
                  layout="fill"
                  objectFit='cover'
                  alt="Buildings"
                />
              </StyledNavImage>
              <StyledNavText>Buildings</StyledNavText>
            </StyledNavItem>
          </Link>
        </StyledNavSection>
      </Main>
    </Container>
  )
}

const StyledBannerSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
  width: 100%;
`

const StyledBannerContainer = styled.div`
  height: 20vh;
  width: 80%;
  position: relative;
  background-color: #224d61;
  border-radius: 0.25rem;
  object-position: center;

  @media (min-width: 1024px) {
    height: 40vh;
  }
`

const StyledBackgroundImage = styled(Image)`
  border-radius: 0.25rem;
`

const StyledBannerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem ;
  background-color: #43454B;
  transform: translateY(-50%);
  border-width: 2px;
  border-radius: 0.25rem;
  border-color: #F2C800;
  border-style: solid;
  text-align: center;
  color: white;
  font-size: clamp(1rem, 2vw, 2rem);
  z-index: 4;
`

const StyledNavSection = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2.5rem 0 1rem 0;
  background-color: #141518;
  position: relative;
  background: repeating-linear-gradient(-35deg,#141518,#141518 10px,#131416 10px,#131416 20px);

  @media (min-width: 465px) {
    flex-direction: row;
  }
`

const StyledNavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  cursor: pointer;

  @media (min-width: 465px) {
    width: 36%;
  }
`

const StyledNavImage = styled.div`
  height: 20vh;
  width: 100%;
  position: relative;
  border-radius: 0.25rem;
  /* opacity: 0.8; */
  background-color: #be7c37;

  @media (min-width: 768px) {
    height: 40vh;
  }
`

const StyledNavText = styled.div`
  min-width: 36%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 2rem ;
  transform: translateY(-50%);
  background-color: #43454B;
  border-width: 2px;
  border-radius: 0.25rem;
  border-color: #F2C800;
  border-style: solid;
  text-align: center;
  vertical-align: center;
  color: white;
  font-size: clamp(1rem, 2vw, 2rem);
  z-index: 1;
`