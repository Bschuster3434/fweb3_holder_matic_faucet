import { useState } from 'react'
import { FaFaucet } from 'react-icons/fa'
import styled from 'styled-components'

import { COLORS, ERROR_NOT_ENOUGH_TOKENS } from '../constants'

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
  contract,
  connecting,
  setError,
  sending,
  setSending,
  ERC20MinTokens,
}) => {
  const [sent, setSent] = useState(false)
  const [tx, setTX] = useState({})
  const handleSubmit = async () => {
    try {
      setSending(true)
      const tx = await contract.faucet(addresses[0])
      await tx.wait()
      console.log({ tx })
      setTX(tx)
      setSending(false)
      setSent(true)
    } catch ({ error }) {
      const message = error?.data?.message
      if (message !== ERROR_NOT_ENOUGH_TOKENS) {
        setError(message)
      } else {
        setError(`${error.data.message}! minimum ${ERC20MinTokens}`)
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
