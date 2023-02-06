import Link from "next/link";
import styled, {keyframes} from "styled-components";

export default function Earthquake() {
  return (
    <Link href="https://events.softgiving.com/donate/HasanAbiForTurkeySyriaEarthquakesFund">
      <StyledContainer>
        <StyledText>MASSIVE EARTHQUAKE IN TURKEY</StyledText>
      </StyledContainer>
    </Link>
  )
}

const slide = keyframes`
  0%{background-position:100% 50%}
  100%{background-position:-33% 50%}
`

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #101113;
  color: white;
  background: repeating-linear-gradient(45deg, #202125,#202125 10px,#131416 10px,#131416 20px);
    background-size: 400% 100%;
  cursor: pointer;

  
  animation: ${slide} 40s linear infinite;

  :hover {
    color: #E5AF07;
    animation: none;
  }
`

const StyledText = styled.p`
  font-weight: 800;
`