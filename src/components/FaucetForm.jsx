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
  faucetContract,
  connecting,
  setError,
}) => {
  const _handleSubmit = async () => {
    try {
      // TODO: check if sent / display message
      const faucetResponse = await faucetContract.faucet(addresses[0])
      console.log({ faucetResponse })
    } catch (e) {
      console.error('error', e.message)
      setError(e.message)
    }
  }
  return addresses[0] ? (
    <InputContainer>
      <SubmitButton
        onClick={_handleSubmit}
        disabled={connecting || addresses[0]}
      >
        <Faucet size={52} />
        <SubmitText>Submit</SubmitText>
      </SubmitButton>
      {/* {faucetResponse && <pre>{JSON.stringify(faucetResponse, null, 2)}</pre>} */}
    </InputContainer>
  ) : (
    <ConnectMetaMaskText>Connect Meta Mask</ConnectMetaMaskText>
  )
}
