import React from 'react'
import { getRecipeByRecipeName } from '../../lib/api'
import styled from 'styled-components'
import { Container, Main, StyledTitle, StyledLine } from '../../components/sharedstyles'
import Image from 'next/image'

export default function Recipe({ recipe }) {
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
              <StyledTitleContainer>
                <StyledVerticalLine />
                <StyledItemsContainerTitle>INPUT</StyledItemsContainerTitle>
              </StyledTitleContainer>
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
              <StyledTitleContainer>
                <StyledVerticalLine />
                <StyledItemsContainerTitle>OUTPUT</StyledItemsContainerTitle>
              </StyledTitleContainer>
            </StyledItemsContainer>
          </StyledItemsSection>
        </StyledContainer>
      </Main>
    </Container>
  )
}

export async function getServerSideProps(context) {
  var name = context.query.name
  const recipe = getRecipeByRecipeName(name)

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
  padding: 0.75rem;
  background-color: #131416;
`

const StyledRecipeTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
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
  justify-content: center;
  margin-top: 0.75rem;
  gap: 1rem;

  @media (min-width: 1440px) {
    gap: 4rem;
  }
`

const StyledItemsContainer = styled.div`
  width: 48%;
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
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  background-color: white;
  border: 0.25rem solid #333333;
  outline: none;

  @media (min-width: 768px) {
    min-height: 17rem;
  }

  @media (min-width: 1440px) {
    min-height: 24rem;
    border-width: 0.45rem;
  }
`

const StyledTitleContainer = styled.div`
  min-width: 32%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledVerticalLine = styled.div`
  width: 2px;
  height: 6px;
  background-color: #dddddd;
`

const StyledItemsContainerTitle = styled.div`
  min-width: 4rem;
  background-color: #dddddd;
  padding: 0.125rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.5rem;
  font-family: Roboto, -apple-system, sans-serif;
  color: #7b7b7c;
  text-align: center;

  @media (min-width: 1440px) {
    min-width: 6rem;
    font-size: 0.75rem;
  }
`

const StyledItemLine = styled.div`
  width: ${props => props.primary ? '96%' : '100%'};
  height: 1px;
  background-color: #CCCBCB;
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
  height: 36px;
  width: 36px;
  background-color: #CCCBCB;
  padding: 0.125rem;
  margin: 0.25rem 0.25rem 0.25rem 0;
  border-radius: ${props => props.isFluid ? '50%' : '0.125rem'};

  @media (min-width: 768px) {
    width: 3rem;
    height: 3rem;
  }

  @media (min-width: 1440px) {
    width: 4rem;
    height: 4rem;
    margin: 0.5rem 0.5rem 0.5rem 0;
  }
`

const StyledItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #696969;
  font-family: Roboto, -apple-system, sans-serif;
`

const StyledItemName = styled.div`
  color: #474747;
  font-size: 0.5rem;
  font-weight: 1000;
  margin-bottom: 0.125rem;

  @media (min-width: 768px) {
    font-size: 0.75rem;
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
  }
`

const StyledUsagePerMinute = styled.div`
  font-size: 0.40rem;

  @media (min-width: 768px) {
    font-size: 0.60rem;
  }

  @media (min-width: 1440px) {
    font-size: 0.8rem;
  }
`

const StyledDetailsSection = styled.section`

`