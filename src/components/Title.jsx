import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'
import copy from 'copy-to-clipboard'
import { useState } from 'react'

import { SmallCopyButton } from './SmallCopyButton'
import { COLORS } from '../constants'

const inFade = keyframes`${fadeIn}`

const TitleText = styled.h1`
  font-size: 3rem;
  align-self: center;
  margin: 1rem 0;
  animation: 5s ${inFade};
  color: ${COLORS.pink};
`
const NetworkText = styled.h3`
  font-size: 1rem;
  align-self: center;
  color: lime;
`

const ContractTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ContractText = styled.p`
  text-align: center;
  color: ${COLORS.primary};
  font-size: 1rem;
  margin: 0;
  padding: 0;
  animation: 7s ${inFade};
`

const CopiedText = styled.span`
  margin-left: 0.5rem;
  color: aliceblue;
`

export const Title = ({ networkName, contractAddress }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    copy(contractAddress)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return (
    <>
      <TitleText>fWeb3 MATIC Faucet</TitleText>
      <ContractText>Contract Address</ContractText>
      <ContractTextContainer>
        <ContractText>{contractAddress}</ContractText>
        <SmallCopyButton handleCopy={handleCopy} />
        {copied && <CopiedText>copied!</CopiedText>}
      </ContractTextContainer>
      {networkName && <NetworkText>Connected to: {networkName}</NetworkText>}
    </>
  )
}
