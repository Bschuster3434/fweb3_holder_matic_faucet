import { useState } from 'react'
import { VscCopy } from 'react-icons/vsc'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
`
const ErrorMessage = styled.p`
  color: red;
  align-self: center;
`

const DebugErrorContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: #dbdbdb;
  max-width: 500px;
  padding: 1rem;
  margin-bottom: 3rem;
  border-radius: 1rem;
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
  color: #666;
  border-radius: 0.5rem;
`

export const Error = ({ error, rawError }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    copy(rawError)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return (
    <ErrorContainer>
      <ErrorMessage>{error}</ErrorMessage>
      {rawError && <DebugErrorContainer>
        <p>Raw error: If the error above doesnt make sense, copy error and paste in #support</p>
        <CodeBlock>{JSON.stringify(rawError, null, 2)}</CodeBlock>
        <CopyButton onClick={handleCopy}><VscCopy size={30}/><span>{copied ? 'coppied!' : 'copy'}</span></CopyButton>
      </DebugErrorContainer>}
    </ErrorContainer>
  )
}
