import Head from 'next/head'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Container, Main, StyledLine, StyledTitle } from '../../components/sharedstyles'
import styled from 'styled-components'
import Link from 'next/link'
import { getAllItems } from '../../lib/api'

export default function Items( items ) {
  const sortedItems = Object.values(items).sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name > a.name) ? -1 : 0))

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Main>
        <StyledContainer>
          <StyledTitle>Items</StyledTitle>
          <StyledLine color='#E5AF07' />
          <StyledItemsContainer>
            {sortedItems.map((e, i) => {
              return (
                <Link href={`/items/${e.slug}`} key={i} >
                  <StyledItem>
                    <StyledItemImage name={e.slug} />
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

      <Footer />
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
  display: grid;
  grid-template-columns: repeat(8, auto);
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`

const StyledItem = styled.div`
  width: 10vw;
  height: 13vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const StyledItemImage = styled.div`
  width: 100%;
  height: 10vw;
  background-color: #9BA3A9;
  background-image: url(${props => 'https://u6.satisfactorytools.com/assets/images/items/'+ props.name +'_256.png'});
  background-position: center;
  background-size: 90%;
  background-repeat: no-repeat;
`

const StyledItemName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3vw;
  background-color: #43454B;
  padding: 0.25rem;
  color: white;
  text-align: center;
`