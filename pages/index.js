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
  margin-top: 48px;
  height: 50%;
  width: 100%;
`

const StyledBannerContainer = styled.div`
  height: 40vh;
  width: 80%;
  position: relative;
  background-color: #224d61;
  border-radius: 0.25rem;
  object-position: center;
`

const StyledBackgroundImage = styled(Image)`
  border-radius: 0.25rem;
`

const StyledBannerText = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.25rem 2rem ;
  background-color: #43454B;
  margin-top: -2.5rem;
  border-width: 2px;
  border-radius: 0.25rem;
  border-color: #F2C800;
  border-style: solid;
  text-align: center;
  color: white;
  font-size: 2.5rem;
  z-index: 4;
`

const StyledNavSection = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 75vh;
  background-color: #141518;
  margin-top: 64px;
  position: relative;
`

const StyledNavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 36%;
  cursor: pointer;
`

const StyledNavImage = styled.div`
  height: 48vh;
  width: 100%;
  position: relative;
  border-radius: 0.25rem;
  opacity: 0.8;
  background-color: #be7c37;
`

const StyledNavText = styled.div`
  height: 8vh;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -2rem;
  background-color: #43454B;
  border-width: 3px;
  border-radius: 0.25rem;
  border-color: #F2C800;
  border-style: solid;
  text-align: center;
  vertical-align: center;
  color: white;
  font-size: 2rem;
  z-index: 1;
`