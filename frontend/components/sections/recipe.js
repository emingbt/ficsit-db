import styled from "styled-components"

export default function Recipe() {
  const mockRecipeData = [
    {
      slug: 'rotor-recipe',
      name: 'Rotor',
      craftTime: 15,
      maunalCraftMultiplier: 0.8,
      isAlternate: false,
      handCraftable: true,
      workshopCraftable: false,
      machineCraftable: true,
      ingredients: [
        {
          itemClass: 'iron-rod',
          quantity: 5
        },
        {
          itemClass: 'screw',
          quantity: 25
        }
      ],
      products: [
        {
          itemClass: 'rotor',
          quantity: 1
        }
      ],
      producedIn: 'assembler',
      event: 'NONE'
    },
    {
      slug: 'alternate-copper-rotor-recipe',
      name: 'Alternate: Copper Rotor',
      craftTime: 16,
      maunalCraftMultiplier: 1,
      isAlternate: true,
      handCraftable: false,
      workshopCraftable: false,
      machineCraftable: true,
      ingredients: [
        {
          itemClass: 'copper-sheet',
          quantity: 6
        },
        {
          itemClass: 'screw',
          quantity: 52
        }
      ],
      products: [
        {
          itemClass: 'rotor',
          quantity: 3
        }
      ],
      producedIn: 'assembler',
      event: 'NONE'
    },
    {
      slug: 'alternate-steel-rotor-recipe',
      name: 'Alternate: Steel Rotor',
      craftTime: 12,
      maunalCraftMultiplier: 1,
      isAlternate: true,
      handCraftable: false,
      workshopCraftable: false,
      machineCraftable: true,
      ingredients: [
        {
          itemClass: 'steel-pipe',
          quantity: 2
        },
        {
          itemClass: 'wire',
          quantity: 6
        }
      ],
      products: [
        {
          itemClass: 'rotor',
          quantity: 1
        }
      ],
      producedIn: 'assembler',
      event: 'NONE'
    }
  ]

  return (
    <StyledSection>
      <StyledTitle>Recipes</StyledTitle>
      <StyledRecipeContainer>
        {mockRecipeData.map((e) => {
          return (
            <StyledRecipe>
              <StyledContainer>
                {e.ingredients.map((i) => {
                  return (
                    <StyledIngredient>
                      <p>{i.quantity}x</p>
                      <div>
                        <div>{i.itemClass}</div>
                        <p>{60 / e.craftTime * i.quantity}/min</p>
                      </div>
                    </StyledIngredient>
                  )
                })}
              </StyledContainer>
              <StyledContainer>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
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
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const StyledIngredient = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 1rem;
`