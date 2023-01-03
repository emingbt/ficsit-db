import styled from 'styled-components'
import Image from 'next/image'
import { Container, Main, StyledLine, StyledTitle, StyledImageContainer } from '../../components/sharedstyles'
import { getItemByItemName } from '../api/index'
import Recipe from '../../components/sections/recipe'
import { Item, ProductionRecipe } from '../../interfaces'
import { Primary } from '../../interfaces/styledComponents'

interface Props {
  item: Item,
  recipes: ProductionRecipe[]
  usagesAsIngredient: ProductionRecipe[]
}

export default function ItemPage({ item, recipes, usagesAsIngredient }: Props) {
  return (
    <Container>
      <Main>
        <StyledTitleSection>
          <StyledTitle>Item</StyledTitle>
          <StyledLine color='#E5AF07' />
        </StyledTitleSection>
        <StyledContainer>
          <StyledSection>
            <StyledDetailHeader>
              <StyledImageContainer>
                <Image
                  src={`/images/items/${item.slug}.png`}
                  width={256}
                  height={256}
                  priority
                  quality={100}
                  alt={item.name}
                />
              </StyledImageContainer>
              <StyledDetail>
                <StyledName>{item.name}</StyledName>
                <StyledText>
                  <p>Stack Size:</p>
                  <p>{item.stackSize}</p>
                </StyledText>
                <StyledText primary>
                  <p>Sink Value:</p>
                  <p>{item.sinkPoints}</p>
                </StyledText>
                <StyledText>
                  <p>Radioactive:</p>
                  <p>{item.isRadioactive ? 'Yes' : 'No'}</p>
                </StyledText>
              </StyledDetail>
            </StyledDetailHeader>
            <StyledDescription>
              {item.description}
            </StyledDescription>
          </StyledSection>
          <Recipe recipes={recipes} title={"Recipes"} />
          <Recipe recipes={usagesAsIngredient} title={"Usages as Ingredient"} />
        </StyledContainer>
      </Main>
    </Container>
  )
}

export async function getServerSideProps(context) {
  var name = context.query.name
  const { item, recipes, usagesAsIngredient } = getItemByItemName(name)

  return {
    props: { item, recipes, usagesAsIngredient }
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
  background-color: #131416;
  margin-top: 1rem;
  padding: 0.75rem;

  @media (min-width: 1024px) {
    padding: 1rem;
  }
`

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const StyledDetailHeader = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (min-width: 768px) {
    height: 8rem;
  }

  @media (min-width: 1024px) {
    height: 12rem;
  }
`

const StyledDetail = styled.div`
  width: calc(100% - 6rem);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #202125;
  text-align: center;
  color: white;
  font-size: 1.5rem;
`

const StyledName = styled.div`
  width: 100%;
  height: 28%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #101010;
  color: white;
  padding: 0.25rem 0.5rem;
  text-align: center;
  font-size: 0.75rem;

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`

const StyledText = styled.div<Primary>`
  width: 100%;
  height: 24%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  text-align: center;
  color: white;
  background-color: ${props => props.primary ? '#43454B' : '#46484E'};
  font-size: 0.5rem;

  @media (min-width: 768px) {
    font-size: 0.75rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`

const StyledDescription = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.5rem;
  background-color: #202125;

  @media (min-width: 768px) {
    width: 80%;
    min-height: 8rem;
    font-size: 0.75rem;
  }

  @media (min-width: 1024px) {
    min-height: 12rem;
    font-size: 1rem;
  }
`