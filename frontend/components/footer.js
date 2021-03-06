import styled from "styled-components"
import { StyledLine } from "./sharedstyles"

export default function Footer() {
  return (
    <Wrapper>
      <StyledLine color="#E5AF07" />
      <StyledText>Built with <span style={{color: '#E5AF07'}}>❤</span> by <a href="https://github.com/emingbt" style={{color: '#D79845'}}>@emingbt</a></StyledText>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const StyledText = styled.p`
  color: #ffffff;
  margin: 32px;
  font-size: 20px;
  a {
    :hover {
      text-decoration: underline;
    }
  }
`