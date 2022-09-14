import React from 'react'
import { Container, Main, StyledLine, StyledTitle } from '../../../components/sharedstyles'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { getBuildingsByCategory } from '../../../lib/api'
import { useRouter } from 'next/router'

export default function Buildings({ buildings }) {
  const router = useRouter()
  const { category } = router.query

  const buildingsData = Object.entries(buildings)

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
            {BuildingCategories.map((e) => {
              return (
                <Link href={`/buildings/${e.toLowerCase()}`} key={e}>
                  <StyledCategory selected={router.query.category == e.toLowerCase()}>
                    <Image
                      src={`/icons/ResIcon_${e}.png`}
                      width={64}
                      height={64}
                      alt={e.toLowerCase()}
                    />
                    <div>{e}</div>
                  </StyledCategory>
                </Link>
              )
            })}
          </StyledCategoiresContainer>
          <StyledLine color='#E5AF07' />
        </StyledHeaderSection>
        <StyledBuildingsSection>
          {buildingsData.map((e, i) => {
            return (
              <React.Fragment key={e[0]}>
                <StyledCategoryTitle>{i + 1}. {e[0].split(/(?=[A-Z])/).join(' ')}</StyledCategoryTitle>
                <StyledBuildingsContainer>
                  {e[1].map((j) => {
                    return (
                      <Link href={`/buildings/${category}/${j.slug}`} key={j.slug}>
                        <StyledBuilding key={j.slug}>
                          <StyledBuildingImage>
                            <Image
                              src={`/images/buildables/${j.slug}.png`}
                              width={256}
                              height={256}
                              alt={j.name}
                            />
                          </StyledBuildingImage>
                          <StyledBuildingName>{j.name}</StyledBuildingName>
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
    props: { buildings }
  }
}

const StyledHeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
`

const StyledCategoiresContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const StyledCategory = styled.div`
  width: 120px;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${props => props.selected ? "#D79845" : "#43454B"};
  color: #eeeeee;
  margin: 0.5rem 0.25rem;
  cursor: pointer;
  :hover {
    background-color: ${props => props.selected ? "#D79845" : "#141518"};
  }
`

const StyledBuildingsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background-color: #131416;
  margin-top: 2rem;
  padding: 2rem;
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
  height: 2rem;
  display: flex;
  align-items: center;
  background-color: #43454B;
  color: white;
  padding-left: 1rem;
  margin-bottom: 1rem;
  grid-gap: 3rem;
  font-size: 1.25rem;
`

const StyledBuilding = styled.div`
  width: calc(100% / 6.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  margin-bottom: 1rem;
  min-width: 9rem;
  max-width: 16rem;
  cursor: pointer;
`

const StyledBuildingImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #43454B;
  padding: 0.25rem;
`

const StyledBuildingName = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #43454B;
  color: white;
  padding: 1rem;
  text-align: center;
  margin-top: 0.05rem;
`