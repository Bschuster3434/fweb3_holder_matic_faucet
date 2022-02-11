import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaFaucet } from 'react-icons/fa'
import { useState } from 'react'

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


  const _handleSubmit = async () => {
    // try {
    //   setState({ ...state, loading: true })
    //   console.log('account', account)
    //   const tx = await sendMaticFromFaucet(account)
    //   console.log({ tx })
    //   setState({ ...state, loading: false })
    // } catch (e) {
    //   setState({ ...state, loading: false, error: e.messge })
    // }
  }
  const { loading, ethAddress } = state
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
