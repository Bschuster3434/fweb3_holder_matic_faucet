import { useState } from 'react'
import { ethers } from 'ethers'

import contract from '../contracts/SchusterEtherFaucet.json'
import { isWeb3Available } from './web3.utils'

const { REACT_APP_FAUCET_CONTRACT_ADDRESS } = process.env

export const useEthers = () => {
  const [state, setState] = useState({
    connecting: false,
    addresses: [],
    error: '',
    contract: null,
  })

  const activate = async () => {
    try {
      if (isWeb3Available) {
        setState({ ...state, connecting: true, error: '' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const addresses = await provider.listAccounts()

        const faucetContract = new ethers.Contract(
          REACT_APP_FAUCET_CONTRACT_ADDRESS,
          contract.abi,
          provider
        )
        const contractBalance = await faucetContract.getBalance()
        const signer = await provider.getSigner()

        setState({
          ...state,
          connecting: false,
          provider,
          signer,
          addresses,
          contractBalance,
          faucetContract,
          connected: true,
        })
      }
    } catch (e) {
      console.error(e)
      setState({ ...state, error: e.message })
    }
  }
  const setError = (error) => {
    setState({ ...state, error })
  }

  return { ...state, activate, setError }
}
