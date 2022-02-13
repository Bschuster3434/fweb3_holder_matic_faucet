import { GiUnplugged } from 'react-icons/gi'
import { GiPlug } from 'react-icons/gi'
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

const renderConnected = (address) => {
  const color = address ? 'green' : 'red'
  return (
    <ConnectIndicator color={color}>
      {address ? <Plug /> : <UnPlugged />}
    </ConnectIndicator>
  )
}

export const ConnectButton = ({ activate, connecting, addresses }) => {
  return (
    <MetaMaskContainer>
      <ConnectMetaMaskButton onClick={() => activate()}>
        {renderConnected(addresses[0])}
        {connecting ? 'connecting...' : addresses[0] ? 'connected' : 'Connect metamask'}
      </ConnectMetaMaskButton>
    </MetaMaskContainer>
  )
}
