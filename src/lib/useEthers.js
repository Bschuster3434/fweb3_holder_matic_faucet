import { useState } from 'react'
import { ethers } from 'ethers'
import contract from '../contracts/SchusterEtherFaucet.json'

import { isWeb3Available } from './eth.utils'

const {
  REACT_APP_TEST_NETWORK_BASE_URL,
  REACT_APP_ALCHEMY_POLYGON_API_KEY,
  REACT_APP_METAMASK_TEST_ACCOUNT_3_PRIK,
  REACT_APP_FAUCET_CONTRACT_ADDRESS,
} = process.env

// const network = `${REACT_APP_TEST_NETWORK_BASE_URL}/${REACT_APP_ALCHEMY_POLYGON_API_KEY}`

export const useEthers = () => {
  const [state, setState] = useState({
    connecting: false,
    address: null,
    error: '',
    contract: null
  })

  const activate = async () => {
    try {
      if (isWeb3Available) {
        setState({ ...state, connecting: true, error: '' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])

        const faucetContract = new ethers.Contract(
          REACT_APP_FAUCET_CONTRACT_ADDRESS,
          contract.abi,
          provider
        )
        const res = await faucetContract.getBalance()
        console.log({ res })
        const signer = provider.getSigner()
        const address = await signer.getAddress()

        setState({
          ...state,
          connecting: false,
          provider,
          signer,
          address,
          // contract: faucetContract,
        })
      }
    } catch (e) {
      console.error(e)
      setState({ ...state, error: e.message })
    }
  }
  return { ...state, activate }
}
