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
  max-width: 10rem;
  cursor: pointer;
`

const StyledItemImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #9BA3A9;
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