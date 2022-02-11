import { UserRejectedRequestError } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core'
import { GiUnplugged } from 'react-icons/gi'
import { injected } from '../lib/connectors'
import { GiPlug } from 'react-icons/gi'
import { useState } from 'react'

import styled from 'styled-components'
import { COLORS } from '../constants'

const MetaMaskContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ConnectMetaMaskButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 1rem;
  color: ${COLORS.primary};
  background: ${COLORS.background};
`
const Plug = styled(() => <GiPlug size={32} />)``
const UnPlugged = styled(() => <GiUnplugged size={32} />)``

const ConnectIndicator = styled.span`
  color: ${(props) => props.color};
  padding: 0 1rem 0 0;
`

const renderConnected = (connected) => {
  const color = connected ? 'green' : 'red'
  return (
    <ConnectIndicator color={color}>
      {connected ? <Plug /> : <UnPlugged />}
    </ConnectIndicator>
  )
}

const defaultState = {
  loading: false,
}

export const ConnectButton = () => {
  const [state, setState] = useState(defaultState)
  const { active, error, activate, setError } = useWeb3React()

  const _handleConnect = async () => {
    try {
      setState({ ...state, loading: true })
      await activate(injected, undefined, true)
      setState({ ...state, loading: false })
    } catch (e) {
      console.error(e.message)
      e instanceof UserRejectedRequestError
        ? setState({ ...state, loading: false })
        : setError(error)
    }
  }
  const { loading } = state

  return (
    <MetaMaskContainer>
      <ConnectMetaMaskButton onClick={_handleConnect}>
        {renderConnected(active)}
        {loading ? 'connecting...' : active ? 'connected' : 'Connect metamask'}
      </ConnectMetaMaskButton>
    </MetaMaskContainer>
  )
}
