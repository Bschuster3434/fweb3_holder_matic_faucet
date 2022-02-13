import styled from 'styled-components'

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ErrorMessage = styled.p`
  color: red;
  align-self: center;
`

export const Error = ({ error }) => (
  <ErrorContainer>
    <ErrorMessage>{error}</ErrorMessage>
  </ErrorContainer>
)
