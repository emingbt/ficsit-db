import { Container, Main, StyledLine, StyledTitle } from '../../components/sharedstyles'
import styled from "styled-components"
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from "next/legacy/image"
import Head from 'next/head'
import { useState } from 'react'

import { Item, BuildingType } from '../../interfaces'
import { Selected } from '../../interfaces/styledComponents'

interface Props {
  items: Item[],
  buildings: BuildingType[]
}

export default function Search({ items, buildings }: Props) {
  const router = useRouter()
  const { name } = router.query

  const [selectedCategory, setSelectedCategory] = useState('items')
  const sortedData = Object.values(selectedCategory == 'items' ? items : buildings).sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name > a.name) ? -1 : 0))

  return <>
    <Head>
      <title>Search | FICSIT DB</title>
    </Head>

    <Container>
      <Main>
        <StyledContainer>
          <StyledHeader>
            <StyledTitle>Search results for : &quot;<StyledSpan>{name}</StyledSpan>&quot;</StyledTitle>
            <StyledCategoryContainer>
              <StyledCategory selected={selectedCategory == 'items'} onClick={() => setSelectedCategory('items')}>Items ({items.length})</StyledCategory>
              <StyledCategory selected={selectedCategory == 'buildables'} onClick={() => setSelectedCategory('buildables')}>Buildings ({buildings.length})</StyledCategory>
            </StyledCategoryContainer>
          </StyledHeader>
          <StyledLine color='#E5AF07' />
          {sortedData.length == 0 ?
            <StyledText>Nothing found.</StyledText> :
            <StyledItemsContainer>
              {sortedData.map((unit, i) => {
                return (
                  <Link
                    href={`/${selectedCategory == 'items' ? 'items' : `buildings/${unit.category}`}/${unit.slug}`}
                    key={i}
                    legacyBehavior>
                    <StyledItem>
                      <StyledItemImage
                        src={unit.imgUrl}
                        width={256}
                        height={256}
                        alt={unit.name}
                      />
                      <StyledItemName>
                        {unit.name}
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
  </>
}

export async function getServerSideProps(context) {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://127.0.0.1:3000'
  const name = context.query.name
  const result = await fetch(`${baseUrl}/api/search?name=${name}`)
  const data = await result.json()

  const items = data.items
  const buildings = data.buildings

  return {
    props: { items, buildings }
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

const StyledCategory = styled.div<Selected>`
  min-width: 4.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.selected ? '#D79845' : '#43454B'};
  color: white;
  margin-bottom: 0.25rem;
  padding: 0.25rem;
  font-size: 0.5rem;
  user-select: none;
  cursor: pointer;

  @media (min-width: 768px) {
    min-width: 6rem;
    font-size: 0.75rem;
  }

  @media (min-width: 1024px) {
    margin-left: 1rem;
    min-width: 8rem;
    padding: 0.5rem 0.25rem;
    font-size: 1rem;
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