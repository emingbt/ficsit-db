import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

export default function ExtractableResources({ extractableResources }) {
  return extractableResources?.length > 0 && (
    <StyledSection>
      <StyledTitle>Extractable Resources</StyledTitle>
      <StyledResourceContainer>
        {extractableResources.map((e) => {
          return (
            <Link href={`/items/${e.split(' ').join('-').toLowerCase()}`} key={e}>
              <StyledResource>
                <StyledResourceImage name={e.split(' ').join('-').toLowerCase()} />
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
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #D79845;
  color: white;
  padding-left: 1.5rem;
  padding-bottom: 0.25rem;
  font-size: 2rem;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 36px;
`

const StyledResourceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 1rem;
`

const StyledResource = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 1.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
`

const StyledResourceImage = styled.div`
  width: 120px;
  aspect-ratio: 1 / 1;
  background-color: #43454B;
  background-image: url(${props => 'https://u6.satisfactorytools.com/assets/images/items/' + props.name + '_256.png'});
  background-position: center;
  background-size: 90%;
  background-repeat: no-repeat;
`

const StyledResourceName = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #202125;
`