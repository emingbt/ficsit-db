import Link from "next/link"
import styled from "styled-components"

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
                      <StyledItemQuantity>{i.quantity}x</StyledItemQuantity>
                      <StyledContainer flexDirection="column">
                        <Link href={`/items/${i.itemClass}`}>
                          <StyledItemImage url={i.imageUrl64}  />
                        </Link>
                        <StyledUsePerMin>{parseFloat((60 / e.craftTime * i.quantity * clockspeed / 100).toFixed(3))}/min</StyledUsePerMin>
                      </StyledContainer>
                    </StyledItem>
                  )
                })}
              </StyledContainer>
              <StyledContainer>
                <StyledVerticalLine isAlternate={e.isAlternate} />
                <StyledContainer flexDirection="row">
                  {e.products.map((j) => {
                    return (
                      <StyledItem product key={j.itemClass}>
                        <StyledItemQuantity>{j.quantity}x</StyledItemQuantity>
                        <StyledContainer flexDirection="column">
                          <Link href={`/items/${j.itemClass}`}>
                            <StyledItemImage url={j.imageUrl64} />
                          </Link>
                          <StyledUsePerMin>{parseFloat((60 / e.craftTime * j.quantity * clockspeed / 100).toFixed(3))}/min</StyledUsePerMin>
                        </StyledContainer>
                      </StyledItem>
                    )
                  })}
                </StyledContainer>
                <StyledVerticalLine isAlternate={e.isAlternate} />
                <StyledBuildingContainer>
                  <Link href={`/buildings/production/${e.producedIn}`}>
                    <StyledBuildingImage producedIn={e.producedIn} />
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
`

const StyledItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 1rem;
  min-width: 180px;
  margin-top: 1rem;
  ${props => props.product && 'margin-right: 2rem;'}
`

const StyledItemQuantity = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
`

const StyledItemImage = styled.div`
  height: 80px;
  aspect-ratio: 1 / 1;
  background-color: #202125;
  border-radius: 8px;
  background-image: url(${props => props.url + '.png'});
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`

const StyledUsePerMin = styled.p`
  font-size: 1.25rem;
  margin: 0.5rem;
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

const StyledBuildingImage = styled.div`
  height: 80px;
  aspect-ratio: 1 / 1;
  background-color: #202125;
  border-radius: 8px;
  background-image: url(${props => 'https://u6.satisfactorytools.com/assets/images/items/' + props.producedIn + '_256.png'});
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`

const StyledCraftTime = styled.div`
  font-size: 1.25rem;
  margin: 0.5rem;
`