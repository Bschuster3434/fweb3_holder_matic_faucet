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

function App() {
  const ethersState = useEthers()

  return isWeb3Available ? (
    <Layout>
      <ConnectButton {...ethersState} />
      <Title />
      <FaucetForm {...ethersState} />
      <Error {...ethersState} />
      <DataDetails {...ethersState} />
    </Layout>
  ) : (
    <InstallMetaMask />
  )
}

export default App
