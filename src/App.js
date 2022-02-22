import {
  Error,
  Layout,
  ConnectButton,
  FaucetForm,
  Title,
  InstallMetaMask,
} from './components'

import { isWeb3Available, useEthers } from './lib'

function App() {
  const ethersState = useEthers()

  return (
    <div data-testid='app'>
      {isWeb3Available() ? (
        <Layout>
          <ConnectButton {...ethersState} />
          <FaucetForm {...ethersState} />
          <Title {...ethersState} />
          <Error {...ethersState} />
        </Layout>
      ) : (
        <InstallMetaMask />
      )}
    </div>
  )
}

export default App
