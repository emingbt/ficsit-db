import styled from "styled-components"
import Image from "next/image"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Main = styled.main`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 240px);
`

const StyledLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${props => props.color};
`

const StyledTitle = styled.div`
  width: 100%;
  text-align: left;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 2.5rem;
  font-family: Roboto, sans-serif;
  font-weight: 400;
`

const StyledImageContainer = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: #9BA3A9;
  padding: 0.25rem;
`

const StyledImage = styled(Image)`
  height: 80px;
  aspect-ratio: 1 / 1;
  background-color: #202125;
  border-radius: 8px;
  padding: 0.25rem;
  cursor: pointer;
`

export { Container, Main, StyledLine, StyledTitle, StyledImageContainer, StyledImage }