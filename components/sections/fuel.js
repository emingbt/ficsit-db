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
            <StyledRecipe key={i}>
              <StyledContainer flexDirection="row">
                <StyledItem>
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
                </StyledItem>
                {
                  e.supplement &&
                  <StyledItem>
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
                  </StyledItem>
                }
              </StyledContainer>
              <StyledContainer>
                {e.byproduct &&
                  <StyledContainer flexDirection="row">
                    <StyledVerticalLine isAlternate={e.isAlternate} />
                    <StyledItem product>
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
  display: flex;
  align-items: center;
  background-color: #D79845;
  color: white;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;

  @media (min-width: 1024px) {
    padding-left: 1rem;
    font-size: 1.5rem;
  }
`

const StyledRecipeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledRecipe = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #43454B;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  color: white;

  @media (min-width: 1024px) {
    height: 8rem;
    padding: 1rem;
  }
`

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: ${props => props.flexDirection};
  justify-content: center;
  align-items: center;
`

const StyledItem = styled.div`
  width: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  margin: 0 0.75rem;

  @media (min-width: 1024px) {
    width: 5rem;
    margin: 0 0.75rem;
    ${props => props.product && "margin-left: 2rem;"}
  }
`

const StyledUsePerMin = styled.p`
  font-size: 0.5rem;
  margin: 0;
  margin-top: 0.5rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`

const StyledVerticalLine = styled.div`
  height: 4rem;
  width: 1px;
  background-color: #D79845;
  ${props => props.isAlternate && 'background: repeating-linear-gradient(-35deg,#E5AF07,#E5AF07 10px,#202125 10px,#202125 20px)'}

  @media (min-width: 1024px) {
    height: 8rem;
  }
`