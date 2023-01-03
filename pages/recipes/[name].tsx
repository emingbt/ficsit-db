import React, { useState } from 'react'
import { getBuildableByName, getRecipeByRecipeName } from '../api'
import styled from 'styled-components'
import { Container, Main, StyledTitle, StyledLine } from '../../components/sharedstyles'
import Image from 'next/image'
import Link from 'next/link'
import { RecipeDetails } from '../../components/sections/recipeDetails'

import { ProductionRecipe, Building } from '../../interfaces'
import { Primary, IsFluid } from '../../interfaces/styledComponents'

interface Props {
  recipe: ProductionRecipe,
  building: Building
}

export default function Recipe({ recipe, building }: Props) {
  const [clockspeed, setClockspeed] = useState(100)
  const [productionRate, setProductionRate] = useState(recipe.products[0].quantity / recipe.craftTime * 60)

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
                    <StyledItemContainer key={ingredient.itemClass}>
                      <StyledItem>
                        <Link href={`/items/${ingredient.itemClass}`}>
                          <StyledItemImage isFluid={ingredient.isFluid}>
                            <Image
                              src={`/images/items/${ingredient.itemClass}.png`}
                              width={72}
                              height={72}
                              alt={ingredient.itemClass}
                              quality={100}
                            />
                          </StyledItemImage>
                        </Link>
                        <StyledItemDetail>
                          <StyledItemName>{ingredient.quantity} {ingredient.name}</StyledItemName>
                          <StyledUsagePerMinute>
                            <span style={{ color: '#e59344' }}>{parseFloat((60 / recipe.craftTime * ingredient.quantity).toFixed(3))} </span>
                            {clockspeed != 100 && (
                              <strong style={{ color: '#e59344' }}>({parseFloat((60 / recipe.craftTime * ingredient.quantity * clockspeed / 100).toFixed(4))})</strong>
                            )} per minute</StyledUsagePerMinute>
                        </StyledItemDetail>
                      </StyledItem>
                      <StyledItemLine />
                    </StyledItemContainer>
                  )
                })}
              </StyledItemsList>
              <StyledTitleContainer>INPUT</StyledTitleContainer>
            </StyledItemsContainer>
            <RecipeDetails
              widescreen={true}
              clockspeed={clockspeed}
              setClockspeed={setClockspeed}
              productionRate={productionRate}
              setProductionRate={setProductionRate}
              recipe={recipe}
              building={building}
            />
            <StyledItemsContainer>
              <StyledItemsList>
                <StyledItemLine primary />
                {recipe.products.map((product) => {
                  return (
                    <StyledItemContainer key={product.itemClass}>
                      <StyledItem>
                        <Link href={`/items/${product.itemClass}`}>
                          <StyledItemImage isFluid={product.isFluid}>
                            <Image
                              src={`/images/items/${product.itemClass}.png`}
                              width={72}
                              height={72}
                              alt={product.itemClass}
                              quality={100}
                            />
                          </StyledItemImage>
                        </Link>
                        <StyledItemDetail>
                          <StyledItemName>{product.quantity} {product.name}</StyledItemName>
                          <StyledUsagePerMinute>
                            <span style={{ color: '#e59344' }}>{parseFloat((60 / recipe.craftTime * product.quantity).toFixed(3))} </span>
                            {clockspeed != 100 && (
                              <strong style={{ color: '#e59344' }}>({parseFloat((60 / recipe.craftTime * product.quantity * clockspeed / 100).toFixed(4))})</strong>
                            )} per minute</StyledUsagePerMinute>
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
          <RecipeDetails
            clockspeed={clockspeed}
            setClockspeed={setClockspeed}
            productionRate={productionRate}
            setProductionRate={setProductionRate}
            recipe={recipe}
            building={building}
          />
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

  @media (min-width: 1024px) {
    font-size: 0.75rem;
    padding: 0.0625rem;
  }
`

const StyledItemLine = styled.div<Primary>`
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

const StyledItemImage = styled.div<IsFluid>`
  height: 2.5rem;
  width: 2.5rem;
  background-color: #43454B;
  padding: 0.25rem;
  margin: 0.5rem 0.25rem 0.5rem 0;
  border-radius: ${props => props.isFluid ? '50%' : '0.125rem'};
  ${props => props.detail && 'margin: 0 0 0 0.25rem;'}
  cursor: pointer;

  @media (min-width: 768px) {
    width: 3rem;
    height: 3rem;
  }

  @media (min-width: 1440px) {
    width: 4.5rem;
    height: 4.5rem;
    margin: 0.5rem 0.5rem 0.5rem 0;
  }
`

const StyledItemDetail = styled.div`
  width: calc(100% - 3rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #CCCCCC;
  font-family: Roboto, -apple-system, sans-serif;

  @media (min-width: 1024px) {
    width: calc(100% - 4rem);
  }

  @media (min-width: 1440px) {
    width: calc(100% - 5rem);
  }
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