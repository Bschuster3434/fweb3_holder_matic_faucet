import { useState } from 'react'
import { ethers } from 'ethers'

import { activateMetaMask } from './ethers.utils'
import { getFaucetWallet, getFaucetContract, getContractAddress } from './fweb3'
import { STATUS } from '../constants'

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
    contractAddress: getContractAddress(),
    rawError: ''
  })

  const activate = async () => {
    try {
      setState({ ...state, connecting: true, error: '' })
      const { provider, addresses, network, signer } =
      await activateMetaMask()

      const wallet = await getFaucetWallet(provider)
      const faucetContract = await getFaucetContract(wallet)
      const contractBalance = await faucetContract.getBalance()
      const minTokens = await faucetContract.getERC20TokenMinimum()
      const ERC20MinTokens = await ethers.utils.formatEther(minTokens)

      const data = {
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
        faucetContract,
      }
      setState(data)
    } catch (e) {
      // useEthers
      debugger
      setState({
        ...state,
        sending: false,
        error: JSON.parse(JSON.stringify(e)).error.data.message ?? 'an unknown error occured',
        connecting: false,
        rawError: JSON.parse(JSON.stringify(e)).error.data.message,
      })
    }
  }
  const setRawError = (e) => {
    setState({ ...state, rawError: e, sending: false })
  }
  const setError = (error) => {
    setState({ ...state, error, sending: false, connecting: false })
  }
  const setSending = (sending) => {
    setState({ ...state, sending })
  }
  return { ...state, activate, setError, setSending, setRawError }
}
