import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { Container, Main, StyledLine, StyledTitle, StyledImageContainer } from '../../../components/sharedstyles'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getBuildableByName, getRecipesByBuildingName } from '../../../lib/api'

import Recipe from '../../../components/sections/recipe'
import ExtractableResources from '../../../components/sections/extractableResources'
import Fuel from '../../../components/sections/fuel'

import { Building, ProductionRecipe } from '../../../interfaces'
import { Overclocked, Selected } from '../../../interfaces/styledComponents'

interface Props {
  buildable: Building,
  recipes: ProductionRecipe[]
}

export default function BuildingPage({ buildable, recipes }: Props) {
  const router = useRouter()
  const { category } = router.query

  const [clockspeed, setClockspeed] = useState(100)
  let energyConsumption = (buildable.meta?.powerInfo?.consumption * (clockspeed / 100) ** buildable.meta?.overclockInfo?.exponent).toFixed(4)

  let powerProduction = (buildable.meta?.generatorInfo?.powerProduction * Math.pow((clockspeed / 100), 1 / buildable.meta?.overclockInfo?.exponent)).toFixed(3)
  let operatingRate = Math.pow((clockspeed / 100), 1 / buildable.meta?.overclockInfo?.exponent) * 100

  const [purity, setPurity] = useState(1)
  let extractionRate = parseFloat((buildable.meta?.extractorInfo?.resourceExtractSpeed * purity * clockspeed / 100).toFixed(2))

  return (
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
              <StyledConsumptionContainer>
                <StyledEnergyContainer>
                  <StyledClockspeedInputContainer>
                    {clockspeed} %
                  </StyledClockspeedInputContainer>
                  <StyledVerticalLine />
                  <StyledEnergyConsumption>{parseFloat(buildable.isGenerator ? powerProduction : energyConsumption)}MW</StyledEnergyConsumption>
                </StyledEnergyContainer>
                <StyledClockspeedContainer>
                  <StyledClockspeedBar
                    type="range"
                    min={1}
                    max={250}
                    step={1}
                    onChange={e => { setClockspeed(+ e.currentTarget.value) }}
                    value={clockspeed}
                  />
                  <StyledClockspeedTextContainer>
                    <StyledClockspeedText></StyledClockspeedText>
                    <StyledClockspeedText overclocked={100 <= clockspeed} onClick={() => setClockspeed(100)}>100%</StyledClockspeedText>
                    <StyledClockspeedText overclocked={150 <= clockspeed} onClick={() => setClockspeed(150)}>150%</StyledClockspeedText>
                    <StyledClockspeedText overclocked={200 <= clockspeed} onClick={() => setClockspeed(200)}>200%</StyledClockspeedText>
                    <StyledClockspeedText overclocked={250 <= clockspeed} onClick={() => setClockspeed(250)}>250%</StyledClockspeedText>
                  </StyledClockspeedTextContainer>
                </StyledClockspeedContainer>
              </StyledConsumptionContainer>
            }
            {
              (buildable.isResourceExtractor && buildable.meta.extractorInfo?.isDependsPurity) &&
              <StyledExtractionContainer>
                <StyledExtractionRate>{extractionRate}/min</StyledExtractionRate>
                <StyledVerticalLine />
                <StyledPurityContainer>
                  <StyledPurity selected={purity == 0.5} onClick={() => setPurity(0.5)}>Impure</StyledPurity>
                  <StyledPurity selected={purity == 1} onClick={() => setPurity(1)}>Normal</StyledPurity>
                  <StyledPurity selected={purity == 2} onClick={() => setPurity(2)}>Pure</StyledPurity>
                </StyledPurityContainer>
              </StyledExtractionContainer>
            }
          </StyledSection>
          <Recipe recipes={recipes} title={"Recipes"} />
          <ExtractableResources extractableResources={buildable.meta?.extractorInfo?.allowedResources} />
          <Fuel fuels={buildable.meta?.generatorInfo?.fuels} operatingRate={operatingRate} />
        </StyledContainer>
      </Main>
    </Container>
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

const StyledConsumptionContainer = styled.div`
  height: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    height: 3rem;
  }
`

const StyledEnergyContainer = styled.div`
  height: 100%;
  width: 6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #43454B;
  color: white;
  font-size: 0.5rem;

  @media (min-width: 768px) {
    width: 8rem;
    font-size: 0.6rem;
  }

  @media (min-width: 1024px) {
    width: 12rem;
    font-size: 1rem;
  }
`

const StyledClockspeedInputContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledVerticalLine = styled.div`
  height: 100%;
  width: 1px;
  justify-self: center;
  background-color: #F1C700;
`

const StyledEnergyConsumption = styled.div`
  padding: 0.125rem;

  @media (min-width: 1024px) {
    padding: 0.5rem;
  }
`

const StyledClockspeedContainer = styled.label`
  height: 100%;
  width: calc(100% - 6rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #9BA3A9;

  @media (min-width: 768px) {
    width: calc(100% - 8rem);
  }

  @media (min-width: 1024px) {
    width: calc(100% - 12rem);
  }
`

const StyledClockspeedBar = styled.input`
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 79%;
  height: 60%;
  user-select: none;
  ::-webkit-slider-runnable-track {
    height: 60%;
    background-color: #43454B;
    background: linear-gradient(90deg, #E39744 0%, #F7DE50 100%);
  }
  ::-moz-range-track {
    height: 60%;
    background-color: #43454B;
    background: linear-gradient(90deg, #E39744 0%, #F7DE50 100%);
  }
  ::-webkit-slider-thumb {
     -webkit-appearance: none;
     appearance: none;
     background-color: #43454B;
     height: 150%;
     width: 0.25rem;
     transform: translateY(-15%);
     z-index: 4;
  }
`

const StyledClockspeedTextContainer = styled.div`
  width: 79%;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  transform: translateY(-25%);

  @media (min-width: 768px) {
    display: flex;
  }
`

const StyledClockspeedText = styled.div<Overclocked>`
  width: 5%;
  text-align: right;
  cursor: pointer;
  color: ${props => props.overclocked ? '#fffeee' : '#141518'};
  font-style: ${props => props.overclocked ? 'normal' : 'italic'};
  margin-left: 15%;
  font-size: 0.5rem;

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }
`

const StyledExtractionContainer = styled.div`
  width: 100%;
  height: 2rem;
  min-height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #202125;

  @media (min-width: 1024px) {
    height: 3rem;
  }
`

const StyledExtractionRate = styled.div`
  width: 6rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  color: white;

  @media (min-width: 768px) {
    width: 8rem;
    font-size: 0.6rem;
  }

  @media (min-width: 1024px) {
    width: 12rem;
    font-size: 1rem;
  }
`

const StyledPurityContainer = styled.div`
  width: calc(100% - 6rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (min-width: 768px) {
    width: calc(100% - 8rem);
  }

  @media (min-width: 1024px) {
    width: calc(100% - 12rem);
  }
`

const StyledPurity = styled.div<Selected>`
  min-width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.selected ? "#D79845" : "#43454B"};
  color: white;
  font-size: 0.5rem;
  cursor: pointer;

  @media (min-width: 1024px) {
    min-width: 6rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
  }
`