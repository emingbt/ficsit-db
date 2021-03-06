import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Main = styled.main`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const StyledLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${props => props.color};
`

export { Container, Main, StyledLine }