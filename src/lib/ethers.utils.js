import { ethers } from 'ethers'
import { STATUS } from '../constants'

export const isWeb3Available = () =>
  typeof window !== 'undefined' && window?.ethereum

export const activateMetaMask = async () => {
  if (!isWeb3Available()) {
    throw new Error('web3 not avail')
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  const addresses = await provider.listAccounts()
  const network = await provider.getNetwork()
  const signer = await provider.getSigner()

  return {
    status: STATUS.ok,
    provider,
    addresses,
    network,
    signer,
  }
}
