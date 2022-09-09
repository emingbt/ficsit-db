import Head from 'next/head'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Container, Main, StyledLine, StyledTitle } from '../../components/sharedstyles'
import styled from 'styled-components'
import Link from 'next/link'
import { getAllItems } from '../../lib/api'
import Image from 'next/image'

export default function Items( items ) {
  const sortedItems = Object.values(items).sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name > a.name) ? -1 : 0))

  return (
    <Container>
      <Main>
        <StyledContainer>
          <StyledTitle>Items</StyledTitle>
          <StyledLine color='#E5AF07' />
          <StyledItemsContainer>
            {sortedItems.map((e, i) => {
              return (
                <Link href={`/items/${e.slug}`} key={i} >
                  <StyledItem>
                    <StyledItemImage
                      src={`/images/items/${e.slug}.png`}
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
        </StyledContainer>
      </Main>
    </Container>
  )
}

export async function getStaticProps() {
  const items = getAllItems()

  return {
    props: items
  }
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
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
  z-index: 2;
`