import { Container, Main, StyledLine, StyledTitle } from '../../components/sharedstyles'
import styled from "styled-components"
import { useRouter } from 'next/router'
import { getFilteredItemsByName } from '../../lib/api'
import Link from 'next/link'
import Image from 'next/image'

export default function Search({ items }) {
  const sortedItems = Object.values(items).sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name > a.name) ? -1 : 0))
  const router = useRouter()
  const { name } = router.query

  return (
    <Container>
      <Main>
        <StyledContainer>
          <StyledTitle>Search results for : &quot;<StyledSpan>{name}</StyledSpan>&quot;</StyledTitle>
          <StyledLine color='#E5AF07' />
          {sortedItems.length == 0 ?
            <StyledText>Nothing found.</StyledText> :
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
          }
        </StyledContainer>
      </Main>
    </Container>
  )
}

export function getServerSideProps(context) {
  const name = context.query.name

  const items = getFilteredItemsByName(name)

  return {
    props: { items }
  }
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
`
const StyledSpan = styled.span`
  color: #D79845;
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