import { Container, Main, StyledLine, StyledTitle } from '../../components/sharedstyles'
import styled from "styled-components"
import { useRouter } from 'next/router'
import { getFilteredItemsByName } from '../../lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Search({ items, buildables }) {
  const [selectedCategory, setSelectedCategory] = useState('items')
  const sortedData = Object.values(selectedCategory == 'items' ? items : buildables).sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name > a.name) ? -1 : 0))
  const router = useRouter()
  const { name } = router.query

  return (
    <Container>
      <Main>
        <StyledContainer>
          <StyledHeader>
            <StyledTitle>Search results for : &quot;<StyledSpan>{name}</StyledSpan>&quot;</StyledTitle>
            <StyledCategoryContainer>
              <StyledCategory selected={selectedCategory == 'items'} onClick={() => setSelectedCategory('items')}>Items ({items.length})</StyledCategory>
              <StyledCategory selected={selectedCategory == 'buildables'} onClick={() => setSelectedCategory('buildables')}>Buildings ({buildables.length})</StyledCategory>
            </StyledCategoryContainer>
          </StyledHeader>
          <StyledLine color='#E5AF07' />
          {sortedData.length == 0 ?
            <StyledText>Nothing found.</StyledText> :
            <StyledItemsContainer>
              {sortedData.map((e, i) => {
                return (
                  <Link href={`/${selectedCategory == 'items' ? 'items' : `buildings/${e.categories[0]}`}/${e.slug}`} key={i} >
                    <StyledItem>
                      <StyledItemImage
                        src={`/images/${selectedCategory}/${e.slug}.png`}
                        width={256}
                        height={256}
                        alt={e.name}
                      />
                      <StyledItemName>
                        {e.name}
                      </StyledItemName>
                    </StyledItem>
                  </Link>
                )
              })}
            </StyledItemsContainer>
          }
        </StyledContainer>
      </Main>
    </Container>
  )
}

export function getServerSideProps(context) {
  const name = context.query.name

  const { items, buildables } = getFilteredItemsByName(name)

  return {
    props: { items, buildables }
  }
}

const StyledContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const StyledSpan = styled.span`
  color: #D79845;
`

const StyledCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const StyledCategory = styled.div`
  min-width: 4.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.selected ? '#D79845' : '#43454B'};
  color: white;
  margin-bottom: 0.25rem;
  padding: 0.25rem;
  font-size: clamp(0.5rem, 1.25vw, 1rem);
  user-select: none;
  cursor: pointer;

  @media (min-width: 768px) {
    min-width: 6rem;
  }

  @media (min-width: 1024px) {
    margin-left: 1rem;
    min-width: 8rem;
    padding: 0.5rem 0.25rem;
  }
`


const StyledText = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`

const StyledItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
`

const StyledItem = styled.div`
  width: 11.25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  min-width: 4rem;
  max-width: 160px;
  cursor: pointer;
`

const StyledItemImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #9BA3A9;
  padding: 1rem;
`

const StyledItemName = styled.div`
  width: 100%;
  min-height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #43454B;
  color: white;
  padding: 0 0.25rem;
  text-align: center;
  font-size: 0.5rem;
  z-index: 2;

  @media (min-width: 768px) {
    font-size: clamp(0.65rem, 1vw, 1rem);
  }

  @media (min-width: 1024px) {
    min-height: 3rem;
  }
`