import styled, { keyframes } from 'styled-components'
import { FaFaucet } from 'react-icons/fa'
import { fadeIn, flash } from 'react-animations'
import { useState } from 'react'

import { submitFaucetRequest } from '../lib'
import { COLORS } from '../constants'
import { SentInfo } from './SentInfo'

const fader = keyframes`${fadeIn}`
const flasher = keyframes`${flash}`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SubmitButton = styled.button`
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${COLORS.background};
  min-width: 20%;
  margin-top: 3rem;
  &:hover {
    border: 1px green solid;
  }
`

const SendingText = styled.h1`
  font-size: 1rem;
  color: ${COLORS.primary};
  animation: 1s ${flasher} alternate infinite;
`
const InfoText = styled.p`
  color: #dbdb;
  font-size: 1rem;
`

const SubmitText = styled.h1`
  color: ${COLORS.primary};
`

const Faucet = styled(({ size }) => (
  <FaFaucet size={size} color={COLORS.primary} />
))`
  padding: 1rem;
`

const ConnectMetaMaskText = styled.h1`
  align-self: center;
  color: yellow;
  font-size: 1.4rem;
  animation: 1s ${fader} alternate infinite;
`

const renderSubmitButton = ({ handleSubmit, connecting, sending }) => (
  <SubmitButton onClick={handleSubmit} disabled={connecting || sending}>
    <Faucet size={80} />
    {sending ? (
      <>
        <SendingText>Sending...</SendingText>
        <InfoText>
          This can take a few min. Please leave the window open
        </InfoText>
      </>
    ) : (
      <SubmitText>Get MATIC</SubmitText>
    )}
  </SubmitButton>
)

export const FaucetForm = ({
  addresses,
  connecting,
  setError,
  setRawError,
  sending,
  setSending,
  faucetContract,
}) => {
  const [sent, setSent] = useState(false)
  const [tx, setTX] = useState({})
  const successfulFaucet = (tx) => {
    setTX(tx)
    setSending(false)
    setSent(true)
  }
  const handleSubmit = async () => {
    try {
      setSending(true)
      const tx = await submitFaucetRequest(faucetContract, addresses[0])
      console.log({ tx })
      await tx.wait()
      successfulFaucet(tx)
    } catch (e) {
      const errorMessage =
        JSON.parse(JSON.stringify(e))?.error?.data?.message || 'unknown error'
      setError(errorMessage)
      setRawError(JSON.stringify(e, null, 2))
      setSending(false)
    }
  }

  return addresses[0] ? (
    <InputContainer>
      {sent ? (
        <SentInfo tx={tx} />
      ) : (
        renderSubmitButton({ handleSubmit, connecting, sending })
      )}
    </InputContainer>
  ) : (
    <ConnectMetaMaskText>Please connect Meta Mask</ConnectMetaMaskText>
  )
}
