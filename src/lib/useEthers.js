import { useState } from 'react'
import { ethers } from 'ethers'

import contract from '../contracts/SchusterEtherFaucet.json'
import { isWeb3Available } from './web3.utils'

const {
  REACT_APP_FAUCET_CONTRACT_ADDRESS,
  REACT_APP_FAUCET_ACCOUNT_PRIVATE_KEY,
} = process.env

export const useEthers = () => {
  const [state, setState] = useState({
    connecting: false,
    connected: false,
    addresses: [],
    error: '',
    contract: null,
    sending: false,
    ERC20MinTokens: null,
    network: null,
    contractAddress: REACT_APP_FAUCET_CONTRACT_ADDRESS
  })

  const activate = async () => {
    try {
      if (isWeb3Available) {
        setState({ ...state, connecting: true, error: '' })
        //Connects to the local instance of Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const addresses = await provider.listAccounts()
        const network = await provider.getNetwork()
        //Creates a Wallet from the Runner's Private Key and connects to the contract
        const wallet = new ethers.Wallet(
          REACT_APP_FAUCET_ACCOUNT_PRIVATE_KEY,
          provider
        )
        const faucetContract = new ethers.Contract(
          REACT_APP_FAUCET_CONTRACT_ADDRESS,
          contract.abi,
          wallet
        )

        const contractBalance = await faucetContract.getBalance()
        const signer = await provider.getSigner()
        const MinTokens = await faucetContract.getERC20TokenMinimum()
        const ERC20MinTokens = await ethers.utils.formatEther(MinTokens)

        setState({
          ...state,
          connecting: false,
          provider,
          signer,
          addresses,
          contractBalance,
          contract: faucetContract,
          connected: true,
          ERC20MinTokens,
          network,
        })
      }
    } catch (e) {
      console.error(e)
      setState({ ...state, error: e.message, sending: false })
    }
  }
  const setError = (error) => {
    setState({ ...state, error, sending: false })
  }
  const setSending = (sending) => {
    setState({ ...state, sending })
  }
  return { ...state, activate, setError, setSending }
}
