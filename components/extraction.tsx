import styled from "styled-components"
import { Selected } from "../interfaces/styledComponents"

interface Props {
  clockspeed: number
  purity: number
  setPurity: React.Dispatch<React.SetStateAction<number>>
  extractSpeed: number
}

export default function Extraction({ clockspeed, purity, setPurity, extractSpeed }: Props) {
  let extractionRate = parseFloat((extractSpeed * purity * clockspeed / 100).toFixed(2))

  return (
    <StyledExtractionContainer>
      <StyledExtractionRate>{extractionRate}/min</StyledExtractionRate>
      <StyledVerticalLine />
      <StyledPurityContainer>
        <StyledPurity selected={purity == 0.5} onClick={() => setPurity(0.5)}>Impure</StyledPurity>
        <StyledPurity selected={purity == 1} onClick={() => setPurity(1)}>Normal</StyledPurity>
        <StyledPurity selected={purity == 2} onClick={() => setPurity(2)}>Pure</StyledPurity>
      </StyledPurityContainer>
    </StyledExtractionContainer>
  )
}

const StyledExtractionContainer = styled.div`
  width: 100%;
  height: 2rem;
  min-height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #202125;

  @media (min-width: 1024px) {
    height: 3rem;
  }
`

const StyledExtractionRate = styled.div`
  width: 6rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  color: white;

  @media (min-width: 768px) {
    width: 8rem;
    font-size: 0.6rem;
  }

  @media (min-width: 1024px) {
    width: 12rem;
    font-size: 1rem;
  }
`

const StyledVerticalLine = styled.div`
  height: 100%;
  width: 1px;
  justify-self: center;
  background-color: #F1C700;
`

const StyledPurityContainer = styled.div`
  width: calc(100% - 6rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (min-width: 768px) {
    width: calc(100% - 8rem);
  }

  @media (min-width: 1024px) {
    width: calc(100% - 12rem);
  }
`

const StyledPurity = styled.div<Selected>`
  min-width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.selected ? "#D79845" : "#43454B"};
  color: white;
  font-size: 0.5rem;
  cursor: pointer;

  @media (min-width: 1024px) {
    min-width: 6rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
  }
`