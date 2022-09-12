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
              <StyledCategory selected={selectedCategory == 'items'} onClick={() => setSelectedCategory('items')}>Items</StyledCategory>
              <StyledCategory selected={selectedCategory == 'buildables'} onClick={() => setSelectedCategory('buildables')}>Buildings</StyledCategory>
            </StyledCategoryContainer>
          </StyledHeader>
          <StyledLine color='#E5AF07' />
          {sortedData.length == 0 ?
            <StyledText>Nothing found.</StyledText> :
            <StyledItemsContainer>
              {sortedData.map((e, i) => {
                return (
                  <Link href={`/${selectedCategory == items ? 'items' : `buildings/${e.category}`}/${e.slug}`} key={i} >
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
  console.log(items)
  return {
    props: { items, buildables }
  }
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
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
  flex-direction: row;
  align-items: center;
`

const StyledCategory = styled.div`
  width: 6rem;
  height: 2.5rem;
  background-color: ${props => props.selected ? '#D79845' : '#43454B'};
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  user-select: none;
  cursor: pointer;
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
  margin-top: 1rem;
`

const StyledItem = styled.div`
  width: 11.25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  min-width: 7rem;
  cursor: pointer;
`

const StyledItemImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #9BA3A9;
  padding: 1rem;
`

const StyledItemName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3vw;
  min-height: 2.5rem;
  background-color: #43454B;
  padding: 0.25rem;
  color: white;
  text-align: center;
  font-size: 100%;
`