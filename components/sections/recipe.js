import Link from "next/link"
import styled from "styled-components"
import { StyledImage } from "../sharedstyles"
import Image from "next/image"

export default function Recipe({ recipes, title, clockspeed = 100 }) {
  return recipes.length > 0 && (
    <StyledSection>
      <StyledTitle>{title}</StyledTitle>
      <StyledRecipeSection>
        {recipes.map((recipe) => {
          return (
            <StyledRecipeContainer key={recipe.slug}>
              <StyledRecipeTitle>
                {recipe.name.split(':')[recipe.isAlternate ? 1 : 0]} {recipe.isAlternate && (<span style={{ color: '#E5AF07' }}>Alternate</span>)}
              </StyledRecipeTitle>
              <StyledRecipe>
                <StyledContainer>
                  {recipe.ingredients.map((ingredient) => {
                    return (
                      <StyledItem key={ingredient.itemClass}>
                        <StyledItemHeader>
                          <StyledItemQuantity>{ingredient.quantity}x</StyledItemQuantity>
                          <Link href={`/items/${ingredient.itemClass}`}>
                            <StyledItemImage>
                              <Image
                                src={`/images/items/${ingredient.itemClass}.png`}
                                width={48}
                                height={48}
                                alt={ingredient.itemClass}
                                quality={40}
                              />
                            </StyledItemImage>
                          </Link>
                        </StyledItemHeader>
                        <StyledUsePerMin>{parseFloat((60 / recipe.craftTime * ingredient.quantity * clockspeed / 100).toFixed(3))}/min</StyledUsePerMin>
                      </StyledItem>
                    )
                  })}
                </StyledContainer>
                <StyledContainer cannotWrap>
                  <StyledVerticalLine isAlternate={recipe.isAlternate} />
                  <StyledContainer product>
                    {recipe.products.map((product) => {
                      return (
                        <StyledItem key={product.itemClass}>
                          <StyledItemHeader>
                            <StyledItemQuantity>{product.quantity}x</StyledItemQuantity>
                            <Link href={`/items/${product.itemClass}`} style={{ position: 'relative' }}>
                              <StyledItemImage>
                                <Image
                                  src={`/images/items/${product.itemClass}.png`}
                                  width={48}
                                  height={48}
                                  alt={product.itemClass}
                                  quality={50}
                                />
                              </StyledItemImage>
                            </Link>
                          </StyledItemHeader>
                          <StyledUsePerMin>{parseFloat((60 / recipe.craftTime * product.quantity * clockspeed / 100).toFixed(3))}/min</StyledUsePerMin>
                        </StyledItem>
                      )
                    })}
                  </StyledContainer>
                  <StyledVerticalLine isAlternate={recipe.isAlternate} />
                  <StyledBuildingContainer>
                    <Link href={`/buildings/production/${recipe.producedIn}`}>
                      <a>
                        <StyledImage
                          src={`/images/buildables/${recipe.producedIn}.png`}
                          width={80}
                          height={80}
                          alt={recipe.producedIn}
                          quality={40}
                        />
                      </a>
                    </Link>
                    <StyledCraftTime>{parseFloat((recipe.craftTime / clockspeed * 100).toFixed(3))}s</StyledCraftTime>
                  </StyledBuildingContainer>
                </StyledContainer>
              </StyledRecipe>
            </StyledRecipeContainer>
          )
        })}
      </StyledRecipeSection>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  width: 100%;
  background-color: #9BA3A9;
  margin-top: 1.5rem;
`

const StyledTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #D79845;
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    padding-left: 1rem;
    font-size: 1.5rem;
  }
`

const StyledRecipeSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledRecipeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledRecipeTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  background-color: #34363b;
  color: white;
  font-size: 0.75rem;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

const StyledRecipe = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #43454B;
  margin-bottom: 1rem;
  color: white;
`

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: ${props => props.cannotWrap ? 'nowrap' : 'wrap'};
  justify-content: center;
  align-items: center;
  ${props => props.product && ('margin-right: 0.25rem;')}
`

const StyledItem = styled.div`
  min-width: 3rem;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0.25rem 0.25rem 0;

  @media (min-width: 768px) {
    min-width: 5rem;
  }
`

const StyledItemHeader = styled.div`
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  @media (min-width: 768px) {
    height: 3rem;
  }
`

const StyledItemQuantity = styled.div`
  font-size: 0.6rem;
  margin-right: 0.25rem;

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`

const StyledItemImage = styled.div`
  height: 100%;
  width: 1.5rem;
  background-color: #202125;
  border-radius: 0.25rem;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 3rem;
    padding: 0.125rem;
  }
`

const StyledUsePerMin = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  font-size: 0.5rem;
  text-align: end;

  @media (min-width: 768px) {
    font-size: 0.75rem;
    padding-right: 0.25rem;
  }
`

const StyledVerticalLine = styled.div`
  width: 1px;
  display: block;
  align-self: stretch;
  background-color: #D79845;
  ${props => props.isAlternate && 'background: repeating-linear-gradient(-25deg,#E5AF07,#E5AF07 0.25rem,#202125 0.25rem,#202125 0.5rem)'}
`

const StyledBuildingContainer = styled.div`
  height: 100%;
  width: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.25rem 0.5rem 0 0.5rem;

  @media (min-width: 768px) {
    width: 3rem;
    margin: 0.25rem 1rem 0 1rem;
  }
`

const StyledCraftTime = styled.div`
  margin-top: 0.25rem;
  font-size: 0.5rem;

  @media (min-width: 768px) {
    font-size: 0.75rem;
  }
`