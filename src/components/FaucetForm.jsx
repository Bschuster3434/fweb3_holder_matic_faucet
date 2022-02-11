import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useWeb3React } from '@web3-react/core'
import { FaFaucet } from 'react-icons/fa'
import { useState } from 'react'

import { faucetContract } from '../lib/web3'
import styled from 'styled-components'
import { COLORS } from '../constants'

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  height: 48px;
  padding: 0 0 0 1rem;
  margin: 0;
  width: 100%;
  background: ${COLORS.background};
  color: ${COLORS.primary};
  border: none;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${COLORS.primary};
  }
  :-ms-input-placeholder {
    color: ${COLORS.primary};
  }
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

const defaultState = {
  loading: false,
}

export const FaucetForm = () => {
  const [state, setState] = useState(defaultState)

  const { active } = useWeb3React()

  const _handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value })
  }

  const _handleSubmit = async () => {
    try {
      setState({ ...state, loading: true })

      // HERE: call contract here
      const contractResponse = await faucetContract.getBalance()
      console.log({ contractResponse })

      setState({ ...state, loading: false })
    } catch (e) {
      setState({ ...state, loading: false, error: e.messge })
    }
  }
  const { loading, ethAddress } = state
  return active ? (
    <InputContainer>
      <Faucet />
      <Input
        name='eth-address'
        placeholder='Receive Address'
        value={ethAddress}
        onChange={_handleChange}
      />
      <SubmitButton onClick={_handleSubmit}>
        {loading ? <Loading /> : 'Submit'}
      </SubmitButton>
    </InputContainer>
  ) : (
    <h1>Please Connect Metamask</h1>
  )
}
