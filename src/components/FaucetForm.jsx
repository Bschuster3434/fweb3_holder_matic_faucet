import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaFaucet } from 'react-icons/fa'
import { useState } from 'react'
import { useEthers, faucetContract } from '../lib'
import styled from 'styled-components'
import { COLORS } from '../constants'

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`


const SubmitButton = styled.button`
  height: 48px;
  border: none;
  padding: 1rem;
  background: ${COLORS.background};
  color: ${COLORS.primary};
`

const Faucet = styled(FaFaucet)`
  padding: 1rem;
  background: white;
  color: ${COLORS.primary};
  background: ${COLORS.background};
`
const Loading = styled(AiOutlineLoading3Quarters)``


export const FaucetForm = () => {
  const [loading, setLoading] = useState(false)
  const etherState = useEthers()

  const _handleSubmit = async () => {
    try {
      setLoading(true)
      const contractInstance = faucetContract(etherState.signer)
      const getTimeout = await contractInstance.getTimeout()
      console.log('drip amount', getTimeout)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.error('error', e.message)
    }
  }

  return true ? (
    <InputContainer>
      <Faucet />
      <SubmitButton onClick={_handleSubmit}>
        {loading ? <Loading /> : 'Submit'}
      </SubmitButton>
    </InputContainer>
  ) : (
    <h1>Please Connect Metamask</h1>
  )
}
