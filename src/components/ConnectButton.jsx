import { GiUnplugged } from 'react-icons/gi'
import { GiPlug } from 'react-icons/gi'
import styled from 'styled-components'
import { COLORS } from '../constants'
import { useEthers } from '../lib/useEthers'

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

export const ConnectButton = () => {
  const { activate, connecting, address } = useEthers()

  const _handleConnect = async () => {
    await activate()
  }

  return (
    <MetaMaskContainer>
      <ConnectMetaMaskButton onClick={_handleConnect}>
        {renderConnected(address)}
        {connecting ? 'connecting...' : address ? 'connected' : 'Connect metamask'}
      </ConnectMetaMaskButton>
    </MetaMaskContainer>
  )
}
