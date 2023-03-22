import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { Container, Main, StyledLine, StyledTitle, StyledImageContainer } from '../../../components/sharedstyles'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getBuildableByName, getRecipesByBuildingName } from '../../api'

import Consumption from '../../../components/consumption'
import Extraction from '../../../components/extraction'

import Recipe from '../../../components/sections/recipe'
import ExtractableResources from '../../../components/sections/extractableResources'
import Fuel from '../../../components/sections/fuel'

import { Building, ProductionRecipe } from '../../../interfaces'

interface Props {
  buildable: Building,
  recipes: ProductionRecipe[]
}

export default function BuildingPage({ buildable, recipes }: Props) {
  const router = useRouter()
  const { category } = router.query

  const [clockspeed, setClockspeed] = useState(100)
  const clockspeedExponent = buildable.meta?.overclockInfo?.exponent

  let energyConsumption = (buildable.meta?.powerInfo?.consumption * (clockspeed / 100) ** clockspeedExponent).toFixed(4)
  let powerProduction = (buildable.meta?.generatorInfo?.powerProduction * Math.pow((clockspeed / 100), 1 / clockspeedExponent)).toFixed(3)
  let operatingRate = Math.pow((clockspeed / 100), 1 / clockspeedExponent) * 100

  const [purity, setPurity] = useState(1)

  return (
    <>
      <Head>
        <title>{buildable.name} | FICSIT DB</title>
      </Head>

      <Container>
        <Main>
          <StyledTitleSection>
            <StyledTitle>{category[0].toUpperCase() + category.slice(1)}</StyledTitle>
            <StyledLine color='#E5AF07' />
          </StyledTitleSection>
          <StyledContainer>
            <StyledSection>
              <StyledDetailContainer>
                <StyledDetailHeader>
                  <StyledImageContainer>
                    <Image
                      src={`/images/buildables/${buildable.slug}.png`}
                      width={256}
                      height={256}
                      priority
                      quality={100}
                      alt={buildable.name}
                    />
                  </StyledImageContainer>
                  <StyledDetail>
                    <StyledName>{buildable.name}</StyledName>
                    <StyledCostTitle>Cost :</StyledCostTitle>
                    <StyledCostContainer>
                      {buildable.cost.map((item) => {
                        return (
                          <StyledCostItem key={item.itemClass}>
                            <StyledText>{item.quantity}x</StyledText>
                            <Link href={`/items/${item.itemClass}`}>
                              <StyledCostItemImage>
                                <Image
                                  src={`/images/items/${item.itemClass}.png`}
                                  layout="fill"
                                  objectFit='cover'
                                  alt={item.itemClass}
                                  quality={40}
                                />
                              </StyledCostItemImage>
                            </Link>
                          </StyledCostItem>
                        )
                      })}
                    </StyledCostContainer>
                  </StyledDetail>
                </StyledDetailHeader>
                <StyledDescription>
                  {buildable.description}
                </StyledDescription>
              </StyledDetailContainer>
              {
                buildable.isOverclockable &&
                <Consumption
                  clockspeed={clockspeed}
                  setClockspeed={setClockspeed}
                  energyConsumption={energyConsumption}
                  powerProduction={powerProduction}
                  isGenerator={buildable.isGenerator}
                />
              }
              {
                (buildable.isResourceExtractor && buildable.meta.extractorInfo?.isDependsPurity) &&
                <Extraction
                  clockspeed={clockspeed}
                  purity={purity}
                  setPurity={setPurity}
                  extractSpeed={buildable.meta.extractorInfo.resourceExtractSpeed}
                />
              }
            </StyledSection>
            <Recipe recipes={recipes} title={"Recipes"} />
            <ExtractableResources extractableResources={buildable.meta?.extractorInfo?.allowedResources} />
            <Fuel fuels={buildable.meta?.generatorInfo?.fuels} operatingRate={operatingRate} />
          </StyledContainer>
        </Main>
      </Container>
    </>
  )
}

export function getServerSideProps(context) {
  const name = context.query.building
  const buildable = getBuildableByName(name)
  const recipes = getRecipesByBuildingName(name)

  return {
    props: { buildable, recipes }
  }
}

const StyledTitleSection = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #131416;
  margin-top: 1rem;
  padding: 0.75rem;

  @media (min-width: 1024px) {
    padding: 1rem;
  }
`

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledDetailContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const StyledDetailHeader = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (min-width: 768px) {
    height: 8rem;
  }

  @media (min-width: 1024px) {
    height: 12rem;
  }
`

const StyledDetail = styled.div`
  width: calc(100% - 6rem);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #202125;
  text-align: center;
  color: white;
  font-size: 1.5rem;
`

const StyledName = styled.div`
  width: 100%;
  height: 28%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #101010;
  color: white;
  padding: 0.25rem 0.5rem;
  text-align: center;
  font-size: 0.75rem;

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`

const StyledCostTitle = styled.div`
  width: 100%;
  height: 12%;
  color: white;
  background-color: #D79845;
  text-align: left;
  padding-left: 1rem;
  font-size: 0.5rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`

const StyledCostContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: #46484E;
`

const StyledCostItem = styled.div`
  height: 42%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 0.125rem;

  @media (min-width: 1024px) {
    min-width: 5rem;
    height: 36%;
    margin: 0 0.5rem;
  }
`

const StyledText = styled.p`
  margin: 0 0.25rem;
  font-size: 0.5rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`

const StyledCostItemImage = styled.div`
  min-width: 1.5rem;
  height: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  background-color: #202125;
  border-radius: 0.25rem;
  cursor: pointer;

  @media (min-width: 768px) {
    min-width: 2.25rem;
  }

  @media (min-width: 1024px) {
    min-width: 2.65rem;
  }
`

const StyledDescription = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.5rem;
  background-color: #202125;

  @media (min-width: 768px) {
    width: 80%;
    min-height: 8rem;
    font-size: 0.75rem;
  }

  @media (min-width: 1024px) {
    min-height: 12rem;
    font-size: 1rem;
  }
`