import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import Image from "next/legacy/image"
import { Container, Main, StyledLine, StyledTitle } from '../../components/sharedstyles'
import { Item } from '../../interfaces/index'

interface Props {
  items: Item[]
}

export default function Items({ items }: Props) {
  return (
    <>
      <Head>
        <title>Items | FICSIT DB</title>
      </Head>

      <Container>
        <Main>
          <StyledContainer>
            <StyledTitle>Items</StyledTitle>
            <StyledLine color='#E5AF07' />
            <StyledItemsContainer>
              {items.map((item, i) => {
                return (
                  <Link href={`/items/${item.slug}`} key={i} >
                    <StyledItem>
                      <StyledItemImage
                        src={item.imgUrl}
                        width={256}
                        height={256}
                        alt={item.name}
                      />
                      <StyledItemName>
                        {item.name}
                      </StyledItemName>
                    </StyledItem>
                  </Link>
                )
              })}
            </StyledItemsContainer>
          </StyledContainer>
        </Main>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://127.0.0.1:3000'
  const result = await fetch(`${baseUrl}/api/items`)
  const items = await result.json()

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

const StyledItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
`

const StyledItem = styled.a`
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