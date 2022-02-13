import styled from 'styled-components'

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ErrorMessage = styled.h1`
  color: red;
`

export const Error = ({ error }) => (
  <ErrorContainer>
    <ErrorMessage>{error}</ErrorMessage>
  </ErrorContainer>
)
