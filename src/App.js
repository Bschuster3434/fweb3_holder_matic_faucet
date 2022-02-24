import {
  Layout,
  ConnectButton,
  FaucetForm,
  Title,
  InstallMetaMask,
  Error,
  Footer
} from './components'

import { isWeb3Available, useEthers } from './lib'

function App() {
  const ethersState = useEthers()
  return (
    <div data-testid='app'>
      {isWeb3Available() ? (
        <Layout>
          <ConnectButton {...ethersState} />
          <Title {...ethersState} />
          <FaucetForm {...ethersState} />
          <Error {...ethersState } />
        </Layout>
      ) : (
        <InstallMetaMask />
      )}
      <Footer />
    </div>
  )
}

export default App
