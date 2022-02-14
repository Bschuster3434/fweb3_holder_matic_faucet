import styled from 'styled-components'

import {
  Error,
  Layout,
  ConnectButton,
  FaucetForm,
  Title,
  InstallMetaMask,
  DataDetails
} from './components'

import { isWeb3Available, useEthers } from './lib'

const { DISABLED } = process.env

const DisabledText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

function App() {
  const ethersState = useEthers()
  if (DISABLED) {
    return <DisabledText><h1>Disabled</h1></DisabledText>
  }
  return isWeb3Available ? (
    <Layout>
      <ConnectButton {...ethersState} />
      <Title networkName={ethersState?.network?.name}/>
      <FaucetForm {...ethersState} />
      <Error {...ethersState} />
      <DataDetails {...ethersState} />
    </Layout>
  ) : (
    <InstallMetaMask />
  )
}

export default App
