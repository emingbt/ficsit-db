import styled from "styled-components"
import { Overclocked } from "../interfaces/styledComponents"

interface Props {
  clockspeed: number
  setClockspeed: React.Dispatch<React.SetStateAction<number>>
  energyConsumption: string
  powerProduction: string
  isGenerator: boolean
}

export default function Consumption({ clockspeed, setClockspeed, energyConsumption, powerProduction, isGenerator }: Props) {
  return (
    <StyledConsumptionContainer>
      <StyledEnergyContainer>
        <StyledClockspeedInputContainer>
          {clockspeed} %
        </StyledClockspeedInputContainer>
        <StyledVerticalLine />
        <StyledEnergyConsumption>{parseFloat(isGenerator ? powerProduction : energyConsumption)}MW</StyledEnergyConsumption>
      </StyledEnergyContainer>
      <StyledClockspeedContainer>
        <StyledClockspeedBar
          type="range"
          min={1}
          max={250}
          step={1}
          onChange={e => { setClockspeed(+ e.currentTarget.value) }}
          value={clockspeed}
        />
        <StyledClockspeedTextContainer>
          <StyledClockspeedText></StyledClockspeedText>
          <StyledClockspeedText overclocked={100 <= clockspeed} onClick={() => setClockspeed(100)}>100%</StyledClockspeedText>
          <StyledClockspeedText overclocked={150 <= clockspeed} onClick={() => setClockspeed(150)}>150%</StyledClockspeedText>
          <StyledClockspeedText overclocked={200 <= clockspeed} onClick={() => setClockspeed(200)}>200%</StyledClockspeedText>
          <StyledClockspeedText overclocked={250 <= clockspeed} onClick={() => setClockspeed(250)}>250%</StyledClockspeedText>
        </StyledClockspeedTextContainer>
      </StyledClockspeedContainer>
    </StyledConsumptionContainer>
  )
}

const StyledConsumptionContainer = styled.div`
  height: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    height: 3rem;
  }
`

const StyledEnergyContainer = styled.div`
  height: 100%;
  width: 6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #43454B;
  color: white;
  font-size: 0.5rem;

  @media (min-width: 768px) {
    width: 8rem;
    font-size: 0.6rem;
  }

  @media (min-width: 1024px) {
    width: 12rem;
    font-size: 1rem;
  }
`

const StyledClockspeedInputContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledVerticalLine = styled.div`
  height: 100%;
  width: 1px;
  justify-self: center;
  background-color: #F1C700;
`

const StyledEnergyConsumption = styled.div`
  padding: 0.125rem;

  @media (min-width: 1024px) {
    padding: 0.5rem;
  }
`

const StyledClockspeedContainer = styled.label`
  height: 100%;
  width: calc(100% - 6rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #9BA3A9;

  @media (min-width: 768px) {
    width: calc(100% - 8rem);
  }

  @media (min-width: 1024px) {
    width: calc(100% - 12rem);
  }
`

const StyledClockspeedBar = styled.input`
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 79%;
  height: 60%;
  user-select: none;
  ::-webkit-slider-runnable-track {
    height: 60%;
    background-color: #43454B;
    background: linear-gradient(90deg, #E39744 0%, #F7DE50 100%);
  }
  ::-moz-range-track {
    height: 60%;
    background-color: #43454B;
    background: linear-gradient(90deg, #E39744 0%, #F7DE50 100%);
  }
  ::-webkit-slider-thumb {
     -webkit-appearance: none;
     appearance: none;
     background-color: #43454B;
     height: 150%;
     width: 0.25rem;
     transform: translateY(-15%);
     z-index: 4;
  }
`

const StyledClockspeedTextContainer = styled.div`
  width: 79%;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  transform: translateY(-25%);

  @media (min-width: 768px) {
    display: flex;
  }
`

const StyledClockspeedText = styled.div<Overclocked>`
  width: 5%;
  text-align: right;
  cursor: pointer;
  color: ${props => props.overclocked ? '#fffeee' : '#141518'};
  font-style: ${props => props.overclocked ? 'normal' : 'italic'};
  margin-left: 15%;
  font-size: 0.5rem;

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }
`