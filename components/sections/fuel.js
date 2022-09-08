import Link from "next/link"
import styled from 'styled-components'
import { StyledImage } from "../sharedstyles"

export default function Fuel({ fuels, operatingRate }) {
  return fuels?.length > 0 && (
    <StyledSection>
      <StyledTitle>Fuels</StyledTitle>
      <StyledRecipeContainer>
        {fuels.map((e, i) => {
          return (
            <StyledRecipe key={e}>
              <StyledContainer flexDirection="row">
                <StyledItem>
                  <StyledContainer flexDirection="column">
                    <Link href={`/items/${e.fuel.itemClass}`}>
                      <StyledImage
                        src={`/images/items/${e.fuel.itemClass}.png`}
                        width={80}
                        height={80}
                        alt={e.fuel.itemClass}
                        quality={40}
                      />
                    </Link>
                    <StyledUsePerMin>{parseFloat((operatingRate / 100 * e.fuel.rate).toFixed(3))}/min</StyledUsePerMin>
                  </StyledContainer>
                </StyledItem>
                {
                  e.supplement &&
                  <StyledItem>
                    <StyledContainer flexDirection="column">
                      <Link href={`/items/${e.supplement.itemClass}`}>
                        <StyledImage
                          src={`/images/items/${e.supplement.itemClass}.png`}
                          width={80}
                          height={80}
                          alt={e.supplement.itemClass}
                          quality={40}
                        />
                      </Link>
                      <StyledUsePerMin>{parseFloat((operatingRate / 100 * e.supplement.rate).toFixed(3))}/min</StyledUsePerMin>
                    </StyledContainer>
                  </StyledItem>
                }
              </StyledContainer>
              <StyledContainer>
                {e.byproduct &&
                  <StyledContainer flexDirection="row">
                    <StyledVerticalLine isAlternate={e.isAlternate} />
                    <StyledItem product>
                      <StyledContainer flexDirection="column" style={{ maxWidth: '80px' }}>
                        <Link href={`/items/${e.byproduct.itemClass}`}>
                          <StyledImage
                            src={`/images/items/${e.byproduct.itemClass}.png`}
                            width={80}
                            height={80}
                            alt={e.byproduct.itemClass}
                            quality={40}
                          />
                        </Link>
                        <StyledUsePerMin>{parseFloat((operatingRate / 100 * e.byproduct.rate).toFixed(3))}/min</StyledUsePerMin>
                      </StyledContainer>
                    </StyledItem>
                  </StyledContainer>
                }
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
  min-width: 160px;
  margin: 0 1rem;
  margin-top: 1rem;
`

const StyledItemImage = styled.div`
  height: 80px;
  aspect-ratio: 1 / 1;
  background-color: #202125;
  border-radius: 8px;
  background-image: url(${props => 'https://u6.satisfactorytools.com/assets/images/items/' + props.name + '_256.png'});
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