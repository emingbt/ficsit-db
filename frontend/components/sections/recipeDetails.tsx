import React from 'react'
import styled from 'styled-components'
import Image from "next/legacy/image"
import Link from 'next/link'
import { Building, ProductionRecipe } from '../../interfaces'
import { IsBuilding, IsFluid, Overclocked, Widescreen } from '../../interfaces/styledComponents'

interface Props {
  widescreen?: boolean,
  clockspeed: number,
  setClockspeed: React.Dispatch<React.SetStateAction<number>>,
  productionRate: number,
  setProductionRate: React.Dispatch<React.SetStateAction<number>>,
  recipe: ProductionRecipe,
  building: {
    slug: string,
    name: string,
    imgUrl: string,
    consumption: number,
    exponent: number
  }
}

export default function RecipeDetails({ widescreen, clockspeed, setClockspeed, productionRate, setProductionRate, recipe, building }: Props) {

  let energyConsumption = parseFloat((building.consumption * (clockspeed / 100) ** building.exponent).toFixed(4))
  let periodTime = parseFloat((recipe.craftTime * 100 / clockspeed).toFixed(4))
  let requiredPowerShards = clockspeed > 200 ? 3 : clockspeed > 150 ? 2 : clockspeed > 100 ? 1 : 0

  const handleClockspeedChange = (e) => {
    setClockspeed(e)
    setProductionRate((recipe.products[0].amount / recipe.craftTime * 60) * e / 100)
  }

  const handleProductionRateChage = (e) => {
    setProductionRate(e)
    setClockspeed(e / (recipe.products[0].amount / recipe.craftTime * 60) * 100)
  }

  return (
    <StyledDetailsSection widescreen={widescreen}>
      <StyledDetailsContainer>
        <StyledClockspeedInputs>
          <StyledClockspeedContainer>
            <StyledDetailTitle>Clock Speed:</StyledDetailTitle>
            <StyledClockSpeedInput
              type="number"
              min={0}
              max={250}
              pattern="^[0-9]*$"
              onChange={e => handleClockspeedChange(e.target.value)}
              value={clockspeed}
            />
          </StyledClockspeedContainer>
          <StyledProductionRateContainer>
            <StyledDetailTitle>Target production rate:</StyledDetailTitle>
            <StyledProductionRateInputContainer>
              <StyledProductionRateInput
                type="number"
                min={0}
                max={999}
                pattern="^[0-9]*$"
                onChange={e => handleProductionRateChage(e.target.value)}
                value={productionRate}
              />
              <StyledPerMinute>per minute</StyledPerMinute>
            </StyledProductionRateInputContainer>
          </StyledProductionRateContainer>
        </StyledClockspeedInputs>
        <StyledClockspeedDetails>
          <StyledClockSpeedDetail>
            <StyledClockspeedDetailTitle>
              Required Energy:
            </StyledClockspeedDetailTitle>
            <StyledClockspeedDetailValue>
              {energyConsumption} MW
            </StyledClockspeedDetailValue>
          </StyledClockSpeedDetail>
          <StyledClockSpeedDetail>
            <StyledClockspeedDetailTitle>
              Period Time:
            </StyledClockspeedDetailTitle>
            <StyledClockspeedDetailValue>
              {periodTime} sec
            </StyledClockspeedDetailValue>
          </StyledClockSpeedDetail>
          <StyledClockSpeedDetail>
            <StyledClockspeedDetailTitle>
              Required Power Shards:
            </StyledClockspeedDetailTitle>
            <StyledClockspeedDetailValueContainer>
              <StyledClockspeedDetailValue>
                {requiredPowerShards}x
              </StyledClockspeedDetailValue>
              <Link href={"/items/power-shard"}>
                <StyledItemImage detail>
                  <Image
                    src={`/images/items/power-shard.png`}
                    width={64}
                    height={64}
                    alt="power-shard"
                  />
                </StyledItemImage>
              </Link>
            </StyledClockspeedDetailValueContainer>
          </StyledClockSpeedDetail>
          <StyledClockSpeedDetail>
            <StyledClockspeedDetailTitle>
              Produced In:
            </StyledClockspeedDetailTitle>
            <StyledClockspeedDetailValueContainer>
              <StyledClockspeedDetailValue isBuilding>
                {building.name}
              </StyledClockspeedDetailValue>
              <Link href={`/buildings/production/${building.slug}`}>
                <StyledItemImage detail>
                  <Image
                    src={building.imgUrl}
                    width={64}
                    height={64}
                    alt={building.slug}
                  />
                </StyledItemImage>
              </Link>
            </StyledClockspeedDetailValueContainer>
          </StyledClockSpeedDetail>
        </StyledClockspeedDetails>
      </StyledDetailsContainer>
      <StyledClockspeedBarContainer>
        <StyledClockspeedBar
          type="range"
          min={0}
          max={250}
          step={5}
          onChange={e => { handleClockspeedChange(e.target.value) }}
          value={clockspeed}
        />
        <StyledClockspeedTextContainer>
          <StyledClockspeedText></StyledClockspeedText>
          <StyledClockspeedText overclocked={100 <= clockspeed} onClick={() => handleClockspeedChange(100)}>100%</StyledClockspeedText>
          <StyledClockspeedText overclocked={150 <= clockspeed} onClick={() => handleClockspeedChange(150)}>150%</StyledClockspeedText>
          <StyledClockspeedText overclocked={200 <= clockspeed} onClick={() => handleClockspeedChange(200)}>200%</StyledClockspeedText>
          <StyledClockspeedText overclocked={250 <= clockspeed} onClick={() => handleClockspeedChange(250)}>250%</StyledClockspeedText>
        </StyledClockspeedTextContainer>
      </StyledClockspeedBarContainer>
      <StyledTitleContainer>OVERCLOCK</StyledTitleContainer>
    </StyledDetailsSection>
  )
}

const StyledDetailsSection = styled.section<Widescreen>`
  width: 100%;
  display: ${props => props.widescreen ? 'none' : 'flex'};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #202125;
  margin: 0.625rem 0.625rem 0 0.625rem;

  @media (min-width: 1024px) {
    margin-top: 0;
    min-height: 18rem;
    display: ${props => props.widescreen ? 'flex' : 'none'}
  }
  
  @media (min-width: 1440px) {
    min-height: 25rem;
  }
`

const StyledDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.75rem;
  padding-bottom: 0;

  @media (min-width: 1024px) {
    margin-top: 1rem;
  }
`

const StyledClockspeedInputs = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const StyledClockspeedContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 0.5rem;
`

const StyledDetailTitle = styled.div`
  font-size: 0.5rem;
  color: #FFFFFF;
  margin-bottom: 0.125rem;

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
  }
`

const StyledClockSpeedInput = styled.input`
  width: 100%;
  height: 1.5rem;
  background-color: #43454B;
  color: #D79845;
  border: 0px solid;
  font-size: 1.25rem;
  padding: 0;
  padding-left: 0.25rem;
  outline: none;
  border-radius: 0;
  
  @media (min-width: 1024px) {
    height: 2.5rem;
    font-size: 2rem;
  }
  
  @media (min-width: 1440px) {
    height: 3rem;
    font-size: 2.5rem;
  }
`

const StyledClockspeedDetails = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`

const StyledClockSpeedDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.125rem;
`

const StyledClockspeedDetailTitle = styled.div`
  font-size: 0.5rem;
  font-family: Roboto;
  color: white;

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
  }
`

const StyledClockspeedDetailValue = styled.div<IsBuilding>`
  font-size: ${props => props.isBuilding ? '0.5rem' : '0.75rem'};
  font-family: Roboto;
  color: #D79845;
  text-align: end;

  @media (min-width: 1024px) {
    font-size: ${props => props.isBuilding ? '0.75rem' : '1rem'};
  }

  @media (min-width: 1440px) {
    font-size: ${props => props.isBuilding ? '1rem' : '1.25rem'};
  }
`

const StyledClockspeedDetailValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const StyledProductionRateContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (min-width: 1440px) {
    margin-top: 1rem;
  }
`

const StyledProductionRateInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const StyledProductionRateInput = styled.input`
  width: 60%;
  height: 1.5rem;
  background-color: #43454B;
  color: #D79845;
  border: 0px solid;
  font-size: 1.125rem;
  padding-left: 0.25rem;
  outline: none;
  border-radius: 0;

  @media (min-width: 1024px) {
    height: 2rem;
    font-size: 1.5rem;
  }

  @media (min-width: 1440px) {
    height: 3rem;
    font-size: 2rem;
    padding-left: 0.5rem;
  }
`

const StyledPerMinute = styled.div`
  font-size: 0.5rem;
  color: white;
  padding-left: 0.25rem;

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
  }
`

const StyledClockspeedBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  padding-bottom: 0.25rem;
`

const StyledClockspeedBar = styled.input`
  overflow: hidden;
  width: 100%;
  -webkit-appearance: none;
  background-color: #43454B;
  border-radius: 0;

  ::-webkit-slider-runnable-track {
    height: 1.5rem;
    -webkit-appearance: none;
    color: #13bba4;
    margin-top: -1px;

    @media (min-width: 1024px) {
      height: 2rem;
    }

    @media (min-width: 1440px) {
      height: 3rem;
    }
  }

  ::-webkit-slider-thumb {
    width: 1px;
    -webkit-appearance: none;
    height: 1.5rem;
    cursor: ew-resize;
    background: #434343;
    box-shadow: -800px 0 0 800px #D79845;

    @media (min-width: 1024px) {
      height: 2rem;
    }

    @media (min-width: 1440px) {
      height: 3rem;
    }
  }

  ::-moz-range-progress {
    background-color: #D79845;
  }
  ::-moz-range-track {
    background-color: #43454B;
  }
  ::-ms-fill-lower {
    background-color: #D79845;
  }
  ::-ms-fill-upper {
    background-color: #43454B;
  }
`

const StyledClockspeedTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledClockspeedText = styled.div<Overclocked>`
  width: calc(100% / 5);
  text-align: right;
  font-size: 0.5rem;
  color: ${props => props.overclocked ? "#D79845" : "#FFFFFF"};
  user-select: none;

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
  }
`

////////////////////////////////

const StyledTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #43454B;
  color: white;
  font-size: 0.5rem;

  @media (min-width: 1024px) {
    font-size: 0.75rem;
    padding: 0.0625rem;
  }
`

const StyledItemImage = styled.div<IsFluid>`
  height: ${props => props.detail ? '1.5rem' : '2.5rem'};
  width: ${props => props.detail ? '1.5rem' : '2.5rem'};
  background-color: #43454B;
  padding: 0.125rem;
  margin: 0.5rem 0.25rem 0.5rem 0;
  border-radius: ${props => props.isFluid ? '50%' : '0.125rem'};
  ${props => props.detail && 'margin: 0 0 0 0.25rem;'}
  cursor: pointer;

  @media (min-width: 768px) {
    width: 2rem;
    height: 2rem;
  }

  @media (min-width: 1024px) {
    width: 2.5rem;
    height: 2.5rem;
  }

  @media (min-width: 1440px) {
    width: 3rem;
    height: 3rem;
    margin: 0.5rem;
  }
`