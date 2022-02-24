import { VscCopy } from 'react-icons/vsc'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import { useState } from 'react'

import { COLORS } from '../constants'
import { useEthers } from '../lib'

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
`
const ErrorMessage = styled.p`
  color: red;
  align-self: center;
  font-size: 1rem;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
`

const DebugErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #dbdbdb;
  padding: 1.5rem;
  margin-bottom: 3rem;
  border-radius: 1rem;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
`

const ErrorInfoText = styled.p`
  margin: 0;
  padding: 0;
  color: salmon;
`

const CodeBlock = styled.p`
  color: #666;
`

const CopyButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.5rem;
  color: ${COLORS.secondary};
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const shouldShowDebug = (error) => {
  return (
    error.toLowerCase().includes('unknown') ||
    error.toLowerCase().includes('undefined')
  )
}

export const Error = ({ error, rawError }) => {
  const [copied, setCopied] = useState(false)
  const ethersState = useEthers()

  const handleCopy = () => {
    copy(JSON.stringify(ethersState.rawError))
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return (
    <ErrorContainer>
      <ErrorMessage>{error}</ErrorMessage>
      {shouldShowDebug(error) && (
        <DebugErrorContainer>
          <ErrorInfoText>
            Copy & Paste the error below in #support if the error above does not
            make sense to you
          </ErrorInfoText>
          <CodeBlock>{rawError}</CodeBlock>
          <CopyButton onClick={handleCopy}>
            <VscCopy size={30} />
            <span>{copied ? 'copied!' : 'copy'}</span>
          </CopyButton>
        </DebugErrorContainer>
      )}
    </ErrorContainer>
  )
}
