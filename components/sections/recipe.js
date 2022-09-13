import Link from "next/link"
import styled from "styled-components"
import { StyledImage } from "../sharedstyles"

export default function Recipe({ recipes, title, clockspeed = 100 }) {
  console.log(recipes)
  return recipes.length > 0 && (
    <StyledSection>
      <StyledTitle>{title}</StyledTitle>
      <StyledRecipeSection>
        {recipes.map((recipe) => {
          return (
            <StyledRecipeContainer>
              <StyledRecipeTitleContainer>
                  {recipe.name.split(':')[recipe.isAlternate ? 1 : 0] } {recipe.isAlternate && (<span style={{color: '#E5AF07'}}>Alternate</span>)}
              </StyledRecipeTitleContainer>
            <StyledRecipe key={recipe.slug}>
              <StyledContainer flexDirection="row">
                {recipe.ingredients.map((ingredient) => {
                  return (
                    <StyledItem key={ingredient.itemClass}>
                      <StyledItemHeader>
                        <StyledItemQuantity>{ingredient.quantity}x</StyledItemQuantity>
                        <Link href={`/items/${ingredient.itemClass}`}>
                          <StyledImage
                            src={`/images/items/${ingredient.itemClass}.png`}
                            width={80}
                            height={80}
                            alt={ingredient.itemClass}
                            quality={40}
                          />
                        </Link>
                      </StyledItemHeader>
                      <StyledUsePerMin>{parseFloat((60 / recipe.craftTime * ingredient.quantity * clockspeed / 100).toFixed(3))}/min</StyledUsePerMin>
                    </StyledItem>
                  )
                })}
              </StyledContainer>
              <StyledContainer>
                <StyledVerticalLine isAlternate={recipe.isAlternate} />
                <StyledContainer product flexDirection="row">
                  {recipe.products.map((product) => {
                    return (
                      <StyledItem key={product.itemClass}>
                        <StyledItemHeader>
                          <StyledItemQuantity>{product.quantity}x</StyledItemQuantity>
                          <Link href={`/items/${product.itemClass}`}>
                            <StyledImage
                              src={`/images/items/${product.itemClass}.png`}
                              width={80}
                              height={80}
                              alt={product.itemClass}
                              quality={40}
                            />
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
                    <StyledImage
                      src={`/images/buildables/${recipe.producedIn}.png`}
                      width={80}
                      height={80}
                      alt={recipe.producedIn}
                      quality={40}
                    />
                  </Link>
                  <StyledCraftTime>{parseFloat((recipe.craftTime / clockspeed * 100).toFixed(3))}sn</StyledCraftTime>
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
  margin-top: 2.5rem;
`

const StyledTitle = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #D79845;
  color: white;
  padding-left: 1.5rem;
  padding-bottom: 0.25rem;
  font-size: 2rem;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 36px;
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

const StyledRecipeTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #34363b;
  color: white;
  font-size: 1.25rem;
`

const StyledRecipe = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #43454B;
  margin-bottom: 36px;
  color: white;
`

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: ${props => props.flexDirection};
  justify-content: center;
  align-items: center;
  padding-left: 0.5rem;
  ${props => props.product && 'margin-right: 1.5rem;'}
`

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 0 1rem 0 0;
  min-width: 160px;
  margin-top: 1rem;
`

const StyledItemHeader = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`

const StyledItemQuantity = styled.div`
  max-width: 3.5rem;
  font-size: 1.75rem;
  margin-right: 0.5rem;
`

const StyledUsePerMin = styled.p`
  font-size: 1.25rem;
  margin: 0;
  margin-top: 0.5rem;
  width: 80px;
  text-align: center;
  align-self: end;
`

const StyledVerticalLine = styled.div`
  height: 100%;
  width: 3px;
  background-color: #D79845;
  ${props => props.isAlternate && 'background: repeating-linear-gradient(-35deg,#E5AF07,#E5AF07 10px,#202125 10px,#202125 20px)'}
`

const StyledBuildingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  margin-top: 1rem;
`

const StyledCraftTime = styled.div`
  font-size: 1.25rem;
  margin-top: 0.5rem;
`