import styled from 'styled-components'
import { COLORS } from '../constants'

const DebugContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

const EnableDebugButton = styled.button`
  background: none;
  color: ${COLORS.primary};
  border: none;
  width: 3rem;
  height: 3rem;
  margin: 1rem;
  padding: 0;
`

export const DebugEnableButton = () => {
  return (
    <DebugContainer>
      <EnableDebugButton>debug</EnableDebugButton>
    </DebugContainer>
  )
}
