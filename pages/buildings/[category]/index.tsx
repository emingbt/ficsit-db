import React from 'react'
import { Container, Main, StyledLine, StyledTitle } from '../../../components/sharedstyles'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { getBuildingsByCategory } from '../../../lib/api'
import { useRouter } from 'next/router'

import { BuildingMap } from '../../../interfaces'
import { Selected } from '../../../interfaces/styledComponents'

export default function Buildings(buildings: BuildingMap) {
  const router = useRouter()
  const { category } = router.query

  const BuildingCategories = [
    'Special',
    'Production',
    'Power',
    'Logistics',
    'Organisation',
    'Transportation',
    'Foundations',
    'Walls',
    'Architecture'
  ]

  return (
    <Container>
      <Main>
        <StyledHeaderSection>
          <StyledTitle>Buildings</StyledTitle>
          <StyledLine color='#E5AF07' />
          <StyledCategoiresContainer>
            {BuildingCategories.map((category) => {
              return (
                <Link href={`/buildings/${category.toLowerCase()}`} key={category}>
                  <StyledCategory selected={router.query.category == category.toLowerCase()}>
                    <Image
                      src={`/icons/ResIcon_${category}.png`}
                      width={64}
                      height={64}
                      alt={category.toLowerCase()}
                      placeholder='empty'
                    />
                    <div>{category}</div>
                  </StyledCategory>
                </Link>
              )
            })}
          </StyledCategoiresContainer>
          <StyledLine color='#e5af07' />
        </StyledHeaderSection>
        <StyledBuildingsSection>
          {Object.keys(buildings).map((key, i) => {
            return (
              <React.Fragment key={key}>
                <StyledCategoryTitle>{i + 1}. {key.split(/(?=[A-Z])/).join(' ')}</StyledCategoryTitle>
                <StyledBuildingsContainer>
                  {buildings[key].map((building) => {
                    return (
                      <Link href={`/buildings/${category}/${building.slug}`} key={building.slug}>
                        <StyledBuilding key={building.slug}>
                          <StyledBuildingImage>
                            <Image
                              src={`/images/buildables/${building.slug}.png`}
                              width={256}
                              height={256}
                              alt={building.name}
                            />
                          </StyledBuildingImage>
                          <StyledBuildingName>{building.name}</StyledBuildingName>
                        </StyledBuilding>
                      </Link>
                    )
                  })}
                </StyledBuildingsContainer>
              </React.Fragment>
            )
          })}
        </StyledBuildingsSection>
      </Main>
    </Container>
  )
}

export async function getServerSideProps(context) {
  var category = context.query.category
  const buildings = getBuildingsByCategory(category)

  return {
    props: { ...buildings }
  }
}

const StyledHeaderSection = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledCategoiresContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const StyledCategory = styled.div<Selected>`
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${props => props.selected ? "#D79845" : "#43454B"};
  color: #eeeeee;
  margin: 0.25rem 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 0.5rem;
  cursor: pointer;
  :hover {
    background-color: ${props => props.selected ? "#D79845" : "#141518"};
  }

  @media (min-width: 768px) {
    width: 7.5vw;
  }

  @media (min-width: 1024px) {
    width: 8vw;
    font-size: 0.75rem;
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
  }
`

const StyledBuildingsSection = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #131416;
  margin-top: 2rem;
  padding: 1rem;
`

const StyledBuildingsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 4rem;
`

const StyledCategoryTitle = styled.div`
  width: calc(100% - 1rem);
  display: flex;
  align-items: center;
  background-color: #43454B;
  color: white;
  padding: 0.25rem 0.5rem;
  margin-bottom: 1rem;
  grid-gap: 3rem;
  font-size: 0.75rem;

  @media (min-width: 1024px) {
    font-size: 1.25rem;
    padding: 0.25rem 0.75rem;
  }
`

const StyledBuilding = styled.div`
  width: 42%;
  max-width: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;

  @media (min-width: 425px) {
    width: 28%;
  }

  @media (min-width: 768px) {
    width: calc(100% / 6.6);
  }
`

const StyledBuildingImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #43454B;
  padding: 0.25rem;
`

const StyledBuildingName = styled.div`
  width: 100%;
  min-height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #43454B;
  color: white;
  padding: 0.25rem 0.5rem;
  margin-top: 0.05rem;
  text-align: center;
  font-size: 0.65rem;

  @media (min-width: 1024px) {
    min-height: 3rem;
    font-size: 1rem;
  }
`