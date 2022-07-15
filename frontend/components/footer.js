import styled from "styled-components"

const Wrapper = styled.footer({
  marginTop: 80,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
})

const StyledText = styled.p({
  color: '#ffffff',
  margin: 32,
  fontSize: 20
})

const Footer = () => {
  return (
    <Wrapper>
      <div style={{height: '1px', backgroundColor: '#E5AF07', width: '100%'}} />
      <StyledText>Built with <span style={{color: '#E5AF07'}}>❤</span> by <a href="https://github.com/emingbt" style={{color: '#D79845'}}>@emingbt</a></StyledText>
    </Wrapper>
  )
}

export default Footer