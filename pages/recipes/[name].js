import React, { useState } from 'react'
import { getBuildableByName, getRecipeByRecipeName } from '../../lib/api'
import styled from 'styled-components'
import { Container, Main, StyledTitle, StyledLine } from '../../components/sharedstyles'
import Image from 'next/image'

export default function Recipe({ recipe, building }) {
  const [clockspeed, setClockspeed] = useState(100)
  const [productionRate, setProductionRate] = useState(recipe.products[0].quantity / recipe.craftTime * 60)

  let energyConsumption = parseFloat((building.meta?.powerInfo?.consumption * (clockspeed / 100) ** building.meta?.overclockInfo?.exponent).toFixed(4))
  let periodTime = parseFloat((recipe.craftTime * 100 / clockspeed).toFixed(4))
  let requiredPowerShards = clockspeed > 200 ? 3 : clockspeed > 150 ? 2 : clockspeed > 100 ? 1 : 0

  const handleClockspeedChange = (e) => {
    setClockspeed(e)
    setProductionRate((recipe.products[0].quantity / recipe.craftTime * 60) * e / 100)
  }

  const handleProductionRateChage = (e) => {
    setProductionRate(e)
    setClockspeed(e / (recipe.products[0].quantity / recipe.craftTime * 60) * 100)
  }

  return (
    <Container>
      <Main>
        <StyledTitleSection>
          <StyledTitle>Recipe</StyledTitle>
          <StyledLine color='#E5AF07' />
        </StyledTitleSection>
        <StyledContainer>
          <StyledRecipeTitleContainer>
            <span style={{ color: '#d38840' }}>Recipe:</span>
            <StyledRecipeTitle>{recipe.name}</StyledRecipeTitle>
          </StyledRecipeTitleContainer>
          <StyledItemsSection>
            <StyledItemsContainer>
              <StyledItemsList>
                <StyledItemLine primary />
                {recipe.ingredients.map((ingredient) => {
                  return (
                    <StyledItemContainer key={ingredient.slug}>
                      <StyledItem>
                        <StyledItemImage isFluid={ingredient.isFluid}>
                          <Image
                            src={`/images/items/${ingredient.slug}.png`}
                            width={64}
                            height={64}
                            alt={ingredient.slug}
                            quality={100}
                          />
                        </StyledItemImage>
                        <StyledItemDetail>
                          <StyledItemName>{ingredient.quantity} {ingredient.name}</StyledItemName>
                          <StyledUsagePerMinute><span style={{ color: '#e59344' }}>{parseFloat((60 / recipe.craftTime * ingredient.quantity).toFixed(3))}</span> per minute</StyledUsagePerMinute>
                        </StyledItemDetail>
                      </StyledItem>
                      <StyledItemLine />
                    </StyledItemContainer>
                  )
                })}
              </StyledItemsList>
              <StyledTitleContainer>INPUT</StyledTitleContainer>
            </StyledItemsContainer>
            <StyledItemsContainer>
              <StyledItemsList>
                <StyledItemLine primary />
                {recipe.products.map((product) => {
                  return (
                    <StyledItemContainer key={product.slug}>
                      <StyledItem>
                        <StyledItemImage isFluid={product.isFluid}>
                          <Image
                            src={`/images/items/${product.slug}.png`}
                            width={64}
                            height={64}
                            alt={product.slug}
                            quality={100}
                          />
                        </StyledItemImage>
                        <StyledItemDetail>
                          <StyledItemName>{product.quantity} {product.name}</StyledItemName>
                          <StyledUsagePerMinute><span style={{ color: '#e59344' }}>{parseFloat((60 / recipe.craftTime * product.quantity).toFixed(3))}</span> per minute</StyledUsagePerMinute>
                        </StyledItemDetail>
                      </StyledItem>
                      <StyledItemLine />
                    </StyledItemContainer>
                  )
                })}
              </StyledItemsList>
              <StyledTitleContainer>OUTPUT</StyledTitleContainer>
            </StyledItemsContainer>
          </StyledItemsSection>
          <StyledDetailsSection>
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
                    <StyledItemImage detail>
                      <Image
                        src={`/images/items/power-shard.png`}
                        width={64}
                        height={64}
                        alt={building.name}
                      />
                    </StyledItemImage>
                  </StyledClockspeedDetailValueContainer>
                </StyledClockSpeedDetail>
                <StyledClockSpeedDetail>
                  <StyledClockspeedDetailTitle>
                    Produced In:
                  </StyledClockspeedDetailTitle>
                  <StyledClockspeedDetailValueContainer>
                    <StyledClockspeedDetailValue building>
                      {building.name}
                    </StyledClockspeedDetailValue>
                    <Link href={`/buildings/production/${building.slug}`}>
                      <StyledItemImage detail>
                        <Image
                          src={`/images/buildables/${building.slug}.png`}
                          width={64}
                          height={64}
                          alt={building.name}
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
        </StyledContainer>
      </Main>
    </Container>
  )
}

export async function getServerSideProps(context) {
  var name = context.query.name
  const recipe = await getRecipeByRecipeName(name)
  const building = getBuildableByName(recipe.producedIn)

  return {
    props: { recipe, building }
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
  justify-content: center;
  margin-top: 1rem;
  padding: 0.625rem;
  background-color: #131416;
`

const StyledRecipeTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #202125;
  padding: 0.5rem 0;
  font-size: 0.75rem;

  @media (min-width: 1440px) {
    font-size: 1rem;
  }
`

const StyledRecipeTitle = styled.div`
  width: 100%;
  color: white;
  font-family: Roboto, -apple-system, sans-serif;
  font-size: 1rem;
  text-align: center;

  @media (min-width: 1440px) {
    font-size: 1.25rem;
  }
`

const StyledItemsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.625rem;

  @media (min-width: 1440px) {
    gap: 4rem;
  }
`

const StyledItemsContainer = styled.div`
  width: calc(50% - 5px);
  max-width: 12rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    max-width: 16rem;
  }

  @media (min-width: 1440px) {
    max-width: 20rem;
  }
`

const StyledItemsList = styled.div`
  width: 100%;
  min-height: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #202125;
  outline: none;

  @media (min-width: 768px) {
    min-height: 17rem;
  }

  @media (min-width: 1440px) {
    min-height: 24rem;
  }
`

const StyledTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #43454B;
  color: white;
  font-size: 0.5rem;
`

const StyledItemLine = styled.div`
  width: ${props => props.primary ? '96%' : '100%'};
  height: 1px;
  background-color: #9BA3A9;
`

const StyledItemContainer = styled.div`
  width: 96%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const StyledItemImage = styled.div`
  height: ${props => props.detail ? '1.5rem' : '2.5rem'};
  width: ${props => props.detail ? '1.5rem' : '2.5rem'};
  background-color: #43454B;
  padding: 0.125rem;
  margin: 0.5rem 0.25rem 0.5rem 0;
  border-radius: ${props => props.isFluid ? '50%' : '0.125rem'};
  ${props => props.detail && 'margin: 0 0 0 0.25rem;'}

  @media (min-width: 768px) {
    width: 3rem;
    height: 3rem;
  }

  @media (min-width: 1440px) {
    width: ${props => props.detail ? '4rem' : '4.5rem'};
    height: ${props => props.detail ? '4rem' : '4.5rem'};
    margin: 0.5rem 0.5rem 0.5rem 0;
  }
`

const StyledItemDetail = styled.div`
  width: calc(100% - 2.5rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #CCCCCC;
  font-family: Roboto, -apple-system, sans-serif;
`

const StyledItemName = styled.div`
  color: #DDDDDD;
  font-size: 0.5rem;
  margin-bottom: 0.125rem;

  @media (min-width: 768px) {
    font-size: 0.75rem;
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
  }
`

const StyledUsagePerMinute = styled.div`
  font-size: 0.4rem;

  @media (min-width: 768px) {
    font-size: 0.6rem;
  }

  @media (min-width: 1440px) {
    font-size: 0.8rem;
  }
`

const StyledDetailsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #202125;
  margin-top: 0.625rem;
`

const StyledDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.75rem;
  padding-bottom: 0;
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
`

const StyledClockSpeedInput = styled.input`
  width: 100%;
  height: 1.5rem;
  background-color: #43454B;
  color: #D79845;
  overflow: hidden;
  border: 0px solid;
  font-size: 1.25rem;
  padding-left: 0.25rem;
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
`

const StyledClockspeedDetailValue = styled.div`
  font-size: ${props => props.building ? '0.5rem' : '0.75rem'};
  font-family: Roboto;
  color: #D79845;
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
  overflow: hidden;
  border: 0px solid;
  font-size: 1.125rem;
  padding-left: 0.25rem;
`

const StyledPerMinute = styled.div`
  font-size: 0.5rem;
  color: white;
  padding-left: 0.25rem;
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

  ::-webkit-slider-runnable-track {
    height: 1.5rem;
    -webkit-appearance: none;
    color: #13bba4;
    margin-top: -1px;
  }

  ::-webkit-slider-thumb {
    width: 1px;
    -webkit-appearance: none;
    height: 1.5rem;
    cursor: ew-resize;
    background: #434343;
    box-shadow: -800px 0 0 800px #D79845;
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

const StyledClockspeedText = styled.div`
  width: calc(100% / 5);
  text-align: right;
  font-size: 0.5rem;
  color: ${ props => props.overclocked ? "#D79845" : "#FFFFFF" };
  user-select: none;
`