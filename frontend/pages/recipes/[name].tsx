import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Main, StyledTitle, StyledLine } from '../../components/sharedstyles'
import Head from 'next/head'
import RecipeDetails from '../../components/sections/recipeDetails'
import RecipeItem from '../../components/recipeItem'

import { ProductionRecipe } from '../../interfaces'
import { Primary } from '../../interfaces/styledComponents'

interface Props {
  recipe: ProductionRecipe
}

export default function Recipe({ recipe }: Props) {
  const [clockspeed, setClockspeed] = useState(100)
  const [productionRate, setProductionRate] = useState(recipe.products[0].amount / recipe.craftTime * 60)

  return (
    <>
      <Head>
        <title>{recipe.name} | FICSIT DB</title>
      </Head>

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
                      <RecipeItem
                        craftTime={recipe.craftTime}
                        item={ingredient}
                        clockspeed={clockspeed}
                        key={ingredient.slug}
                      />
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
                building={recipe.building}
              />
              <StyledItemsContainer>
                <StyledItemsList>
                  <StyledItemLine primary />
                  {recipe.products.map((product) => {
                    return (
                      <RecipeItem
                        craftTime={recipe.craftTime}
                        item={product}
                        clockspeed={clockspeed}
                        key={product.slug}
                      />
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
              building={recipe.building}
            />
          </StyledContainer>
        </Main>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://127.0.0.1:3000'
  const name = context.query.name
  const result = await fetch(`${baseUrl}/api/recipe?slug=${name}`)
  const recipe = await result.json()

  return {
    props: { recipe }
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