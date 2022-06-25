import React from "react"
import styled from "styled-components"

const Wrapper = styled.div({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#D79845',
  backgroundImage: `url(./Facepalm01.png)`
})

const StyledImageDiv = styled.div`
  height: 100%;
  width: 50%;
  background-image: url(./Facepalm01.png);
  background-position: center bottom;
  background-attachment: initial;
  background-size: cover;
  margin-left: 72px;
`

const StyledDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#CCCCCC'
})

const StyledLine = styled.div`
  height: 8px;
  width: 100%;
  background-image: repeating-linear-gradient(-45deg,
    #E5AF07 0 16px,
    #141518 16px 32px);
`

const InProgress = () => {
  return (
    <Wrapper>
      <StyledDiv style={{
        height: '100%',
        width: '50%'
      }}>
        <StyledDiv style={{
            backgroundColor: '#202125'
        }}>
          <StyledLine style={{height: '8px', width:'100%', backgroundColor: 'red'}} />
          <div style={{
            padding: 24
          }}>
            <h1>Hello! I know it's true.</h1>
            <h2><a href="https://www.github.com/emingbt" style={{color: '#D79845'}}>Emin</a> is still trying to finish the project</h2>
            <p>"Because of my exams, I can't give too much time for the project. 🙁"</p>
          </div>
          <StyledLine style={{height: '8px', width:'100%', backgroundColor: 'red'}} />
        </StyledDiv>
      </StyledDiv>
      <StyledImageDiv />
    </Wrapper>
  )
}

export default InProgress