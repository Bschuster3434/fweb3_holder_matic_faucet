import { VscCopy } from 'react-icons/vsc'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import { useState } from 'react'

import { COLORS } from '../constants'

const CopyButton = styled((props) => <VscCopy {...props} />)`
  margin-left: 1rem;
`
const CopiedText = styled.p`
  color: #fff;
  margin: 0 1rem;
  padding: 0;
`
export const SmallCopyButton = ({ copyValue }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    copy(copyValue)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return (
    <>
      {copied ? (
        <CopiedText>copied</CopiedText>
      ) : (
        <CopyButton onClick={handleCopy} size={20} color={COLORS.primary} />
      )}
    </>
  )
}
