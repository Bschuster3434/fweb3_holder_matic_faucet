import { useState } from 'react'
import { FaFaucet } from 'react-icons/fa'
import styled from 'styled-components'

import { COLORS, ERROR_NOT_ENOUGH_TOKENS } from '../constants'
import { submitFaucetRequest } from '../lib'
import { handleError } from '../lib/ethers.utils'

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
  color: ${COLORS.primary};
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
  faucetContract
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
      if (tx.status === 'error') {
        setSending(false)
        setError(tx.e.error.data.message || 'unknown error')
        return
      }
      await tx.wait()
      successfulFaucet(tx)
    } catch (e) {
      const { message } = handleError(e)
      if (message !== ERROR_NOT_ENOUGH_TOKENS) {
        setError(message)
      } else {
        setError(`${message}! minimum ${ERC20MinTokens}`)
      }
    }
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
    <ConnectMetaMaskText>Connect Meta Mask</ConnectMetaMaskText>
  )
}
