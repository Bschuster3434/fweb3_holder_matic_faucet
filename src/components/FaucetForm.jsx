import styled, { keyframes } from 'styled-components'
import { FaFaucet } from 'react-icons/fa'
import { fadeIn } from 'react-animations'
import { useState } from 'react'

import { submitFaucetRequest } from '../lib'
import { COLORS } from '../constants'

const fader = keyframes`${fadeIn}`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SubmitButton = styled.button`
  border: none;
  padding: 1rem;
  background-color: ${COLORS.background};
`

const SubmitText = styled.h1`
  font-size: 2rem;
  color: ${COLORS.primary};
`

const Faucet = styled(({ size }) => (
  <FaFaucet size={size} color={COLORS.primary} />
))`
  padding: 1rem;
`

const ConnectMetaMaskText = styled.h1`
  align-self: center;
  color: red;
  font-size: 1.4rem;
  animation: 1s ${fader} alternate infinite;
`

const renderSubmitButton = ({ handleSubmit, connecting, sending }) => (
  <SubmitButton onClick={handleSubmit} disabled={connecting || sending}>
    <Faucet size={52} />
    {sending ? (
      <>
        <SubmitText>Sending...</SubmitText>
        <SubmitText>
          This can take a few min. Please leave the window open
        </SubmitText>
      </>
    ) : (
      <SubmitText>Submit</SubmitText>
    )}
  </SubmitButton>
)

export const FaucetForm = ({
  addresses,
  connecting,
  setError,
  sending,
  setSending,
  ERC20MinTokens,
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
    setSending(true)
    const tx = await submitFaucetRequest(faucetContract, addresses[0])
    console.log({ tx })
    if (tx.status === 'error') {
      setError(tx.e?.message ?? 'tx error')
      return
    }
    await tx.wait()
    successfulFaucet(tx)
  }
  return addresses[0] ? (
    <InputContainer>
      {sent ? (
        <>
          <h3>Sent!</h3>
          <pre>{JSON.stringify(tx, null, 2)}</pre>
        </>
      ) : (
        renderSubmitButton({ handleSubmit, connecting, sending })
      )}
    </InputContainer>
  ) : (
    <ConnectMetaMaskText>Please connect Meta Mask</ConnectMetaMaskText>
  )
}
