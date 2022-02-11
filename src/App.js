import {
  Error,
  Layout,
  ConnectButton,
  FaucetForm,
  Title,
  InstallMetaMask,
} from './components'

import { isWeb3Available } from './lib'

function App() {
  return isWeb3Available ? (
    <Layout>
      <ConnectButton />
      <Title />
      <FaucetForm />
      <Error />
    </Layout>
  ) : (
    <InstallMetaMask />
  )
}

export default App
