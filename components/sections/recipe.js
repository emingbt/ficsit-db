import Link from "next/link"
import styled from "styled-components"
import { StyledImage } from "../sharedstyles"

export default function Recipe({ recipes, title, clockspeed = 100 }) {
  return recipes.length > 0 && (
    <StyledSection>
      <StyledTitle>{title}</StyledTitle>
      <StyledRecipeContainer>
        {recipes.map((e) => {
          return (
            <StyledRecipe key={e.slug}>
              <StyledContainer flexDirection="row">
                {e.ingredients.map((i) => {
                  return (
                    <StyledItem key={i.itemClass}>
                      <StyledItemHeader>
                        <StyledItemQuantity>{i.quantity}x</StyledItemQuantity>
                        <Link href={`/items/${i.itemClass}`}>
                          <StyledImage
                            src={`/images/items/${i.itemClass}.png`}
                            width={80}
                            height={80}
                            alt={i.itemClass}
                            quality={40}
                          />
                        </Link>
                      </StyledItemHeader>
                      <StyledUsePerMin>{parseFloat((60 / e.craftTime * i.quantity * clockspeed / 100).toFixed(3))}/min</StyledUsePerMin>
                    </StyledItem>
                  )
                })}
              </StyledContainer>
              <StyledContainer>
                <StyledVerticalLine isAlternate={e.isAlternate} />
                <StyledContainer product flexDirection="row">
                  {e.products.map((j) => {
                    return (
                      <StyledItem key={j.itemClass}>
                        <StyledItemHeader>
                          <StyledItemQuantity>{j.quantity}x</StyledItemQuantity>
                          <Link href={`/items/${j.itemClass}`}>
                            <StyledImage
                              src={`/images/items/${j.itemClass}.png`}
                              width={80}
                              height={80}
                              alt={j.itemClass}
                              quality={40}
                            />
                          </Link>
                        </StyledItemHeader>
                        <StyledUsePerMin>{parseFloat((60 / e.craftTime * j.quantity * clockspeed / 100).toFixed(3))}/min</StyledUsePerMin>
                      </StyledItem>
                    )
                  })}
                </StyledContainer>
                <StyledVerticalLine isAlternate={e.isAlternate} />
                <StyledBuildingContainer>
                  <Link href={`/buildings/production/${e.producedIn}`}>
                    <StyledImage
                      src={`/images/buildables/${e.producedIn}.png`}
                      width={80}
                      height={80}
                      alt={e.producedIn}
                      quality={40}
                    />
                  </Link>
                  <StyledCraftTime>{parseFloat((e.craftTime / clockspeed * 100).toFixed(3))}sn</StyledCraftTime>
                </StyledBuildingContainer>
              </StyledContainer>
            </StyledRecipe>
          )
        })}
      </StyledRecipeContainer>
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

const StyledRecipeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 2rem;
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
  margin: 0.5rem;
`