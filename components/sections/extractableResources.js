import Link from 'next/link'
import styled from 'styled-components'
import { StyledImage } from '../sharedstyles'
import Image from 'next/image'

export default function ExtractableResources({ extractableResources }) {
  return extractableResources?.length > 0 && (
    <StyledSection>
      <StyledTitle>Extractable Resources</StyledTitle>
      <StyledResourceContainer>
        {extractableResources.map((e) => {
          return (
            <Link href={`/items/${e.split(' ').join('-').toLowerCase()}`} key={e}>
              <StyledResource>
                <StyledResourceImage>
                  <Image
                    src={`/images/items/${e.split(' ').join('-').toLowerCase()}.png`}
                    width={120}
                    height={120}
                    alt={e}
                  />
                </StyledResourceImage>
                <StyledResourceName>{e}</StyledResourceName>
              </StyledResource>
            </Link>
          )
        })}
      </StyledResourceContainer>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #9BA3A9;
  margin-top: 2.5rem;
`

const StyledTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #D79845;
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;

  @media (min-width: 1024px) {
    padding-left: 1rem;
    font-size: 1.5rem;
  }
`

const StyledResourceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5rem 0 0 0.5rem;

  @media (min-width: 1024px) {
    padding: 1rem 0 0 1rem;
  }
`

const StyledResource = styled.div`
  width: 30%;
  max-width: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem 0.5rem 0;
  cursor: pointer;

  @media (min-width: 1024px) {
    min-width: 8rem;
    margin: 0 1rem 1rem 0;
  }
`

const StyledResourceImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: 0.25rem;
  background-color: #43454B;
`

const StyledResourceName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background-color: #202125;
  color: white;
  font-size: 0.5rem;

  @media (min-width: 425px) {
    font-size: 0.75rem;
  }

  @media (min-width: 1024px) {
    padding: 0.5rem;
    font-size: 1rem;
  }
`