import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import contract from '../contracts/SchusterEtherFaucet.json'

const { FAUCET_CONTRACT_ADDRESS } = process.env

export const getLibrary = (provider) => {
  return new Web3Provider(provider)
}

export const faucetContract = async () => {
  try {
    const provider = ethers.getDefaultProvider()
    return new ethers.Contract(FAUCET_CONTRACT_ADDRESS, contract.abi, provider)
  } catch (e) {
    console.error(e)
  }
}
