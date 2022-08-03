import Link from "next/link"
import styled from "styled-components"

export default function Recipe() {
  const mockRecipeData = [
    {
      slug: "blade-runners-recipe",
      name: "Blade Runners",
      craftTime: 60,
      maunalCraftMultiplier: 1,
      isAlternate: false,
      handCraftable: false,
      workshopCraftable: true,
      machineCraftable: false,
      ingredients: [
        {
          itemClass: "quickwire",
          quantity: 20
        },
        {
          itemClass: "modular-frame",
          quantity: 3
        },
        {
          itemClass: "rotor",
          quantity: 3
        }
      ],
      products: [
        {
          itemClass: "blade-runners",
          quantity: 1
        }
      ],
      producedIn: "equipment-workshop",
      event: "NONE"
    },
    {
      slug: "factory-cart-recipe",
      name: "Factory Cart™",
      craftTime: 20,
      maunalCraftMultiplier: 2,
      isAlternate: false,
      handCraftable: false,
      workshopCraftable: true,
      machineCraftable: false,
      ingredients: [
        {
          itemClass: "reinforced-iron-plate",
          quantity: 4
        },
        {
          itemClass: 'iron-rod',
          quantity: 4
        },
        {
          itemClass: "rotor",
          quantity: 2
        }
      ],
      products: [
        {
          itemClass: "factory-cart",
          quantity: 1
        }
      ],
      producedIn: "equipment-workshop",
      event: "NONE"
    },
    {
      slug: "golden-factory-cart-recipe",
      name: "Golden Factory Cart™",
      craftTime: 20,
      maunalCraftMultiplier: 2,
      isAlternate: false,
      handCraftable: false,
      workshopCraftable: true,
      machineCraftable: false,
      ingredients: [
        {
          itemClass: "caterium-ingot",
          quantity: 15
        },
        {
          itemClass: "iron-rod",
          quantity: 4
        },
        {
          itemClass: "rotor",
          quantity: 2
        }
      ],
      products: [
        {
          itemClass: "golden-factory-cart",
          quantity: 1
        }
      ],
      producedIn: "equipment-workshop",
      event: "NONE"
    },
    {
      slug: "motor-recipe",
      name: "Motor",
      craftTime: 12,
      maunalCraftMultiplier: 2,
      isAlternate: false,
      handCraftable: true,
      workshopCraftable: false,
      machineCraftable: true,
      ingredients: [
        {
          itemClass: "rotor",
          quantity: 2
        },
        {
          itemClass: "stator",
          quantity: 2
        }
      ],
      products: [
        {
          itemClass: "motor",
          quantity: 1
        }
      ],
      producedIn: "assembler",
      event: "NONE"
    },
    {
      slug: "smart-plating-recipe",
      name: "Smart Plating",
      craftTime: 30,
      maunalCraftMultiplier: 1,
      isAlternate: false,
      handCraftable: false,
      workshopCraftable: false,
      machineCraftable: true,
      ingredients: [
        {
          itemClass: "reinforced-iron-plate",
          quantity: 1
        },
        {
          itemClass: "rotor",
          quantity: 1
        }
      ],
      products: [
        {
          itemClass: "smart-plating",
          quantity: 1
        }
      ],
      producedIn: "assembler",
      event: "NONE"
    },
    {
      slug: "alternate-electric-motor-recipe",
      name: "Alternate: Electric Motor",
      craftTime: 16,
      maunalCraftMultiplier: 1,
      isAlternate: true,
      handCraftable: false,
      workshopCraftable: false,
      machineCraftable: true,
      ingredients: [
        {
          itemClass: "electromagnetic-control-rod",
          quantity: 1
        },
        {
          itemClass: "rotor",
          quantity: 2
        }
      ],
      products: [
        {
          itemClass: "motor",
          quantity: 2
        }
      ],
      producedIn: "assembler",
      event: "NONE"
    },
    {
      slug: "alternate-rigour-motor-recipe",
      name: "Alternate: Rigour Motor",
      craftTime: 48,
      maunalCraftMultiplier: 1,
      isAlternate: true,
      handCraftable: false,
      workshopCraftable: false,
      machineCraftable: true,
      ingredients: [
        {
          itemClass: "rotor",
          quantity: 3
        },
        {
          itemClass: "stator",
          quantity: 3
        },
        {
          itemClass: "crystal-oscillator",
          quantity: 1
        }
      ],
      products: [
        {
          itemClass: "motor",
          quantity: 6
        }
      ],
      producedIn: "manufacturer",
      event: "NONE"
    },
    {
      slug: "alternate-plastic-smart-plating-recipe",
      name: "Alternate: Plastic Smart Plating",
      craftTime: 24,
      maunalCraftMultiplier: 1,
      isAlternate: true,
      handCraftable: false,
      workshopCraftable: false,
      machineCraftable: true,
      ingredients: [
        {
          itemClass: "reinforced-iron-plate",
          quantity: 1
        },
        {
          itemClass: "rotor",
          quantity: 1
        },
        {
          itemClass: "plastic",
          quantity: 3
        }
      ],
      products: [
        {
          itemClass: "smart-plating",
          quantity: 2
        }
      ],
      producedIn: "manufacturer",
      event: "NONE"
    },
    {
      slug: "alternate-turbo-electric-motor-recipe",
      name: "Alternate: Turbo Electric Motor",
      craftTime: 64,
      maunalCraftMultiplier: 1,
      isAlternate: true,
      handCraftable: false,
      workshopCraftable: false,
      machineCraftable: true,
      ingredients: [
        {
          itemClass: "motor",
          quantity: 7
        },
        {
          itemClass: "radio-control-unit",
          quantity: 9
        },
        {
          itemClass: "electromagnetic-control-rod",
          quantity: 5
        },
        {
          itemClass: "rotor",
          quantity: 7
        }
      ],
      products: [
        {
          itemClass: "turbo-motor",
          quantity: 3
        }
      ],
      producedIn: "manufacturer",
      event: "NONE"
    }
  ]

  return (
    <StyledSection>
      <StyledTitle>Usages as ingredient</StyledTitle>
      <StyledRecipeContainer>
        {mockRecipeData.map((e) => {
          return (
            <StyledRecipe key={e.slug}>
              <StyledContainer flexDirection="row">
                {e.ingredients.map((i) => {
                  return (
                    <StyledItem key={i.itemClass}>
                      <StyledItemQuantity>{i.quantity}x</StyledItemQuantity>
                      <StyledContainer flexDirection="column">
                        <Link href={`/items/${i.itemClass}`}>
                          <StyledItemImage name={i.itemClass} />
                        </Link>
                        <StyledUsePerMin>{60 / e.craftTime * i.quantity}/min</StyledUsePerMin>
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
                        <StyledContainer flexDirection="column" style={{maxWidth: '80px'}}>
                          <Link href={`/items/${j.itemClass}`}>
                            <StyledItemImage name={j.itemClass} />
                          </Link>
                          <StyledUsePerMin>{60 / e.craftTime * j.quantity}/min</StyledUsePerMin>
                        </StyledContainer>
                      </StyledItem>
                    )
                  })}
                </StyledContainer>
                <StyledVerticalLine isAlternate={e.isAlternate} />
                <StyledBuildingContainer>
                  <StyledBuildingImage producedIn={e.producedIn} />
                  <StyledCraftTime>{e.craftTime}sn</StyledCraftTime>
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