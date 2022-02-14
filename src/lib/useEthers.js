import { useState } from 'react'
import { ethers } from 'ethers'

import { activateMetaMask, handleError } from './ethers.utils'
import { getFaucetWallet, getFaucetContract } from './fweb3'
import { STATUS } from '../constants'

const { REACT_APP_FAUCET_CONTRACT_ADDRESS } = process.env

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
    contractAddress: REACT_APP_FAUCET_CONTRACT_ADDRESS,
  })

  const activate = async () => {
    try {
      setState({ ...state, connecting: true, error: '' })
      const {
        data: { provider, addresses, network, signer },
        status,
        message,
      } = await activateMetaMask()
      if (status !== STATUS.ok) {
        console.error(message)
        setState({
          ...state,
          connecting: false,
          connected: false,
          error: message,
        })
        return
      }
      const wallet = await getFaucetWallet(provider)
      const faucetContract = await getFaucetContract(wallet)
      // const contractBalance = await faucetContract.getBalance()
      const minTokens = await faucetContract.getERC20TokenMinimum()
      const ERC20MinTokens = await ethers.utils.formatEther(minTokens)

      const data = {
        ...state,
        connecting: false,
        provider,
        signer,
        addresses,
        // contractBalance,
        contract: faucetContract,
        connected: true,
        ERC20MinTokens,
        network,
      }
      setState(data)
    } catch (e) {
      const { message } = handleError(e)
      setState({ ...state, sending: false, error: message, connecting: false })
    }
  }
  const setError = (error) => {
    setState({ ...state, error, sending: false, connecting: false })
  }
  const setSending = (sending) => {
    setState({ ...state, sending })
  }
  return { ...state, activate, setError, setSending }
}
