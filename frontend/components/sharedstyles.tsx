import styled from "styled-components"
import Image from "next/legacy/image"

interface StyledLine {
  color: string
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Main = styled.main`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 240px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 1rem;
`

const StyledLine = styled.div<StyledLine>`
  height: 1px;
  width: 100%;
  background-color: ${props => props.color};
`

const StyledTitle = styled.div`
  width: 100%;
  color: white;
  padding: 0.5rem 0 0.5rem 0.5rem;
  font-size: clamp(1rem, 3vw, 2rem);
  font-family: Roboto, sans-serif;
  text-align: left;

`

const StyledImageContainer = styled.div`
  width: 6rem;
  aspect-ratio: 1 / 1;
  background-color: #9BA3A9;
  padding: 0.25rem;

  @media (min-width: 768px) {
    width: 8rem;
  }

  @media (min-width: 1024px) {
    width: 12rem;
  }
`

const StyledImage = styled(Image)`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: #202125;
  border-radius: 0.25rem;
  cursor: pointer;
`

export { Container, Main, StyledLine, StyledTitle, StyledImageContainer, StyledImage }