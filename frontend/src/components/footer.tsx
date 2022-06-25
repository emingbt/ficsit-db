import React from "react"
import styled from "styled-components"

const Wrapper = styled.div({
  marginTop: 80
})

const StyledText = styled.p({
  color: '#ffffff',
  margin: 32
})

const Footer = () => {
  return (
    <Wrapper>
      <div style={{flex: 1, height: '1px', backgroundColor: '#E5AF07'}} />
      <StyledText>Built by <span style={{color: '#E5AF07'}}>❤</span> by <a href="https://github.com/emingbt" style={{color: '#D79845'}}>@emingbt</a></StyledText>
    </Wrapper>
  )
}

export default Footer