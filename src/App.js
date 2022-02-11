import { FaFaucet } from 'react-icons/fa'
import styled from 'styled-components'
import { useState } from 'react'

import { 
  Error, 
  Loading, 
  Layout, 
  ConnectButton 
} from './components'

import { COLORS } from './constants'

const Title = styled.h1`
  font-size: 3rem;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  height: 48px;
  padding: 0 0 0 1rem;
  margin: 0;
  width: 100%;
  background: #666;
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
  background: #666;
  color: ${COLORS.primary};
`

const Faucet = styled(FaFaucet)`
  padding: 1rem;
  background: white;
  color: ${COLORS.primary};
  background: #666;
`

const defaultState = {
  connected: false,
  loading: false,
  error: '',
}

function App() {
  const [state, setState] = useState(defaultState)

  const _handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value })
  }

  const handleConnect = async () => {
    try {
      setState({ ...state, loading: true, error: '' })
      // TODO: do web3 stuff
      setState({ ...state, loading: false, connected: true })
      // TODO: remove\
      console.log({ state })
    } catch (e) {
      setState({ ...state, loading: false, error: e.message })
    }
  }
  const _handleSubmit = async () => {
    try {
      setState({ ...state, loading: true })
      // TODO: do web3 stuff
      setState({ ...state, loading: false })
      // TODO: remove
      console.log({ state })
    } catch (e) {
      setState({ ...state, loading: false, error: e.messge })
    }
  }
  const { loading, error, ethAddress, connected } = state
  return loading ? (
    <Loading />
  ) : (
    <Layout>
      <ConnectButton handleConnect={handleConnect} connected={connected} />
      <Title>fWeb3 MATIC Faucet</Title>
      <InputContainer>
        <Faucet />
        <Input
          name='eth-address'
          placeholder='eth address'
          value={ethAddress}
          onChange={_handleChange}
        />
        <SubmitButton onClick={_handleSubmit}>Submit</SubmitButton>
      </InputContainer>
      <Error messge={error} />
    </Layout>
  )
}

export default App
