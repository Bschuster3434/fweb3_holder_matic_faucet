import styled from 'styled-components'
import { COLORS } from '../constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 2rem;
  color: ${COLORS.secondard};
`

export const Layout = ({ children }) => <Container>{children}</Container>
