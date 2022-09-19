import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { Container, Main, StyledLine, StyledTitle, StyledImageContainer, StyledImage } from '../../../components/sharedstyles'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getBuildableByName, getRecipesByBuildingName } from '../../../lib/api'

import Recipe from '../../../components/sections/recipe'
import ExtractableResources from '../../../components/sections/extractableResources'
import Fuel from '../../../components/sections/fuel'

export default function Building({ buildable, recipes }) {
  const router = useRouter()
  const { category } = router.query

  const [clockspeed, setClockspeed] = useState(100)
  let energyConsumption = (buildable.meta?.powerInfo?.consumption * (clockspeed / 100) ** buildable.meta?.overclockInfo?.exponent).toFixed(3)

  let powerProduction = (buildable.meta?.generatorInfo?.powerProduction * Math.pow((clockspeed / 100), 1 / buildable.meta?.overclockInfo?.exponent)).toFixed(3)
  let operatingRate = Math.pow((clockspeed / 100), 1 / buildable.meta?.overclockInfo?.exponent) * 100

  const [purity, setPurity] = useState(1)
  let extractionRate = buildable.meta?.extractorInfo?.resourceExtractSpeed * purity * clockspeed / 100

  return (
    <Container>
      <Main>
        <StyledTitleSection>
          <StyledTitle>{category.charAt(0).toUpperCase() + category.slice(1)}</StyledTitle>
          <StyledLine color='#E5AF07' />
        </StyledTitleSection>
        <StyledContainer>
          <StyledSection>
            <StyledDetailContainer>
              <StyledImageContainer>
                <Image
                  name={buildable.slug}
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
                  {buildable.cost.map((e) => {
                    return (
                      <StyledCostItem key={e.itemClass}>
                        <StyledText>{e.quantity}x</StyledText>
                        <Link href={`/items/${e.itemClass}`}>
                          <StyledCostItemImage>
                            <Image
                              src={`/images/items/${e.itemClass}.png`}
                              width={64}
                              height={64}
                              layout="fill"
                              objectFit='cover'
                              alt={e.itemClass}
                              quality={40}
                            />
                          </StyledCostItemImage>
                        </Link>
                      </StyledCostItem>
                    )
                  })}
                </StyledCostContainer>
              </StyledDetail>
              {/* <StyledDetail description>
                {buildable.description}
              </StyledDetail> */}
            </StyledDetailContainer>
            {
              buildable.isOverclockable &&
              <StyledConsumptionContainer>
                <StyledEnergyContainer>
                  <div>{clockspeed}%</div>
                  <StyledVerticalLine />
                  <div>{parseFloat(buildable.isGenerator ? powerProduction : energyConsumption)}MW</div>
                </StyledEnergyContainer>
                <StyledClockspeedContainer>
                  <StyledClockspeedInput
                    type="range"
                    min={1}
                    max={250}
                    step={1}
                    onChange={e => { setClockspeed(e.currentTarget.value); }}
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
          <Recipe recipes={recipes} title={"Recipes"} clockspeed={clockspeed} />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  background-color: #131416;
  margin-top: 1rem;
  padding: 0.75rem;
`

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledDetailContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 6rem;
  @media (min-width: 768px) {
    height: 8rem;
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
  font-size: ${props => props.description ? '1.25rem' : '1.5rem'};
  ${props => props.description && 'padding: 2rem;'}
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
`

const StyledCostTitle = styled.div`
  width: 100%;
  height: 12%;
  color: white;
  background-color: #D79845;
  text-align: left;
  padding-left: 2rem;
  font-size: 0.5rem;
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
  margin: 0 0.75rem;
`

const StyledText = styled.p`
  margin: 0 0.25rem;
  font-size: 0.5rem;
`

const StyledCostItemImage = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  padding: 0.125rem;
  background-color: #202125;
  border-radius: 0.25rem;
`

const StyledConsumptionContainer = styled.div`
  height: 75px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const StyledEnergyContainer = styled.div`
  height: 100%;
  width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #43454B;
  color: white;
  font-size: 1.5rem;
`

const StyledVerticalLine = styled.div`
  height: 100%;
  width: 2px;
  justify-self: center;
  background-color: #F1C700;
`

const StyledClockspeedContainer = styled.label`
  height: 100%;
  width: calc(100% - 250px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #9BA3A9;
`

const StyledClockspeedInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  background-size: 50px;
  cursor: pointer;
  width: 79%;
  ::-webkit-slider-runnable-track {
    height: 30px;
    background-color: #43454B;
    background: linear-gradient(90deg, #E39744 0%, #F7DE50 100%);
  }
  ::-moz-range-track {
    height: 30px;
    background-color: #43454B;
    background: linear-gradient(90deg, #E39744 0%, #F7DE50 100%);
  }
  ::-webkit-slider-thumb {
     -webkit-appearance: none;
     appearance: none;
     background-color: #43454B;
     height: 30px;
     width: 2px;
  }
`

const StyledClockspeedTextContainer = styled.div`
  width: 79%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`

const StyledClockspeedText = styled.div`
  width: 5%;
  text-align: right;
  cursor: pointer;
  color: ${props => props.overclocked ? '#fffeee' : '#141518'};
  font-style: ${props => props.overclocked ? 'normal' : 'italic'};
  margin-left: 15%;
`

const StyledExtractionContainer = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #202125;
`

const StyledExtractionRate = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: white;
`

const StyledPurityContainer = styled.div`
  width: calc(100% - 252px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const StyledPurity = styled.div`
  width: 9rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3.25rem;
  background-color: ${props => props.selected ? "#D79845" : "#43454B"};
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`