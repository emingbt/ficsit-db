import styled from "styled-components"
import { StyledLine } from "./sharedstyles"

export default function Footer() {
  return (
    <Wrapper>
      <StyledLine color="#E5AF07" />
      <StyledText>Built by <StyledAnchor href="https://github.com/emingbt">@emingbt</StyledAnchor></StyledText>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const StyledText = styled.p`
  color: #ffffff;
  margin: 1.5rem;
  font-size: 1.25rem;
`

const StyledAnchor = styled.a`
  color: #9BA3A9;
  :hover {
    color: #E5AF07;
      text-decoration: underline;
  }
`