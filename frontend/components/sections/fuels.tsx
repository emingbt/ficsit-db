import Link from "next/link"
import styled from 'styled-components'
import { Building, Fuel } from "../../interfaces"
import { FlexDirection, IsAlternate, Product } from "../../interfaces/styledComponents"
import { StyledImage } from "../sharedstyles"

interface Props {
  fuels: Fuel[],
  operatingRate: number
}

export default function Fuels({ fuels, operatingRate }: Props) {
  let transformedFuels = []

  fuels.map((fuel, i) => {
    const transformedItems = fuel.items.reduce((acc, item) => {
      const itemType = item.type.split('_')[0].toLowerCase()
      acc[itemType] = {
        imgUrl: item.imgUrl,
        rate: item.rate,
        slug: item.slug
      }
      return acc
    }, {})
    transformedFuels.push(transformedItems)
  })

  return fuels?.length > 0 && (
    <StyledSection>
      <StyledTitle>Fuels</StyledTitle>
      <StyledRecipeContainer>
        {transformedFuels.map((items, i) => {
          return (
            <StyledRecipe key={i}>
              <StyledContainer flexDirection="row">
                <StyledItem>
                  <Link href={`/items/${items.fuel.slug}`}>

                    <StyledImage
                      src={items.fuel.imgUrl}
                      width={80}
                      height={80}
                      alt={items.fuel.slug}
                      quality={40}
                    />

                  </Link>
                  <StyledUsePerMin>{parseFloat((operatingRate / 100 * items.fuel.rate).toFixed(3))}/min</StyledUsePerMin>
                </StyledItem>
                {
                  items.supplement &&
                  <StyledItem>
                    <Link href={`/items/${items.supplement.slug}`}>

                      <StyledImage
                        src={items.supplement.imgUrl}
                        width={80}
                        height={80}
                        alt={items.supplement.slug}
                        quality={40}
                      />

                    </Link>
                    <StyledUsePerMin>{parseFloat((operatingRate / 100 * items.supplement.rate).toFixed(3))}/min</StyledUsePerMin>
                  </StyledItem>
                }
              </StyledContainer>
              <StyledContainer>
                {
                  items.product &&
                  <StyledContainer flexDirection="row">
                    <StyledVerticalLine />
                    <StyledItem product>
                      <Link href={`/items/${items.product.slug}`}>

                        <StyledImage
                          src={items.product.imgUrl}
                          width={80}
                          height={80}
                          alt={items.product.slug}
                          quality={40}
                        />

                      </Link>
                      <StyledUsePerMin>{parseFloat((operatingRate / 100 * items.product.rate).toFixed(3))}/min</StyledUsePerMin>
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

const StyledContainer = styled.div<FlexDirection>`
  height: 100%;
  display: flex;
  flex-direction: ${props => props.flexDirection};
  justify-content: center;
  align-items: center;
`

const StyledItem = styled.div<Product>`
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

  @media (min-width: 1024px) {
    height: 8rem;
  }
`