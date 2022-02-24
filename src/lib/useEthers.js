import { useState } from 'react'
import { ethers } from 'ethers'

import { activateMetaMask } from './ethers.utils'
import { getFaucetWallet, getFaucetContract, getContractAddress } from './fweb3'

export const useEthers = () => {
  const [sending, setSending] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [faucetContract, setFaucetContract] = useState(null)
  const [addresses, setAddresses] = useState([])
  const [minRequiredTokens, setMinRequiredTokens] = useState(null)
  const [network, setNetwork] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contractBalance, setContractBalance] = useState(null)
  const [error, setError] = useState('')
  const [rawError, setRawError] = useState('')

  const contractAddress = getContractAddress()

  const activate = async () => {
    try {
      setError('')
      setConnecting(true)
      const { provider, addresses, network, signer } =
      await activateMetaMask()

      const wallet = await getFaucetWallet(provider)
      const faucetContract = await getFaucetContract(wallet)
      const contractBalance = await faucetContract.getBalance()
      const minTokens = await faucetContract.getERC20TokenMinimum()
      const minRequiredTokens = await ethers.utils.formatEther(minTokens)

      setConnecting(false)
      setConnected(true)
      setProvider(provider)
      setSigner(signer)
      setAddresses(addresses)
      setContractBalance(contractBalance)
      setFaucetContract(faucetContract)
      setMinRequiredTokens(minRequiredTokens)
      setNetwork(network)
    } catch (e) {
      setSending(false)
      setConnecting(false)
      setError(JSON.parse(JSON.stringify(e)).error.data.message ?? 'an unknown error occured')
      setRawError(e)
    }
  }

  return {
    sending,
    setSending,
    connecting,
    connected,
    faucetContract,
    addresses,
    minRequiredTokens,
    network,
    provider,
    signer,
    contractBalance,
    contractAddress,
    error,
    setError,
    rawError,
    setRawError,
    activate
  }
}
