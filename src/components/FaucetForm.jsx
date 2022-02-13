import { FaFaucet } from 'react-icons/fa'
import styled from 'styled-components'

import { COLORS } from '../constants'

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
export const FaucetForm = ({
  addresses,
  contract,
  connecting,
  setError,
  sending,
  setSending,
}) => {
  const _handleSubmit = async () => {
    try {
      console.log('handle submit', contract)
      // TODO: check if sent / display message
      setSending(true)
      const faucetResponse = await contract.faucet(addresses[0])
      // const faucetResponse = await contract.getBalance()
      console.log({ faucetResponse })
      setSending(false)
    } catch (e) {
      console.error('error', e.message)
      setError(e.message)
    }
  }
  return addresses[0] ? (
    <InputContainer>
      <SubmitButton
        onClick={_handleSubmit}
        disabled={connecting || sending}
      >
        <Faucet size={52} />
        {sending ? (
          <SubmitText>Sending...</SubmitText>
        ) : (
          <SubmitText>Submit</SubmitText>
        )}
      </SubmitButton>
      {/* {faucetResponse && <pre>{JSON.stringify(faucetResponse, null, 2)}</pre>} */}
    </InputContainer>
  ) : (
    <ConnectMetaMaskText>Connect Meta Mask</ConnectMetaMaskText>
  )
}
