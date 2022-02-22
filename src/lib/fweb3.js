import { ethers } from 'ethers'

import contract from '../contracts/SchusterEtherFaucet.json'

const {
  REACT_APP_FAUCET_ACCOUNT_PRIVATE_KEY,
  REACT_APP_FAUCET_CONTRACT_ADDRESS,
} = process.env

export const getFaucetWallet = async (provider) => {
  return new ethers.Wallet(REACT_APP_FAUCET_ACCOUNT_PRIVATE_KEY, provider)
}

export const getFaucetContract = (wallet) => {
  return new ethers.Contract(
    REACT_APP_FAUCET_CONTRACT_ADDRESS,
    contract.abi,
    wallet
  )
}

export const submitFaucetRequest = async (faucetContract, address) => {
  return faucetContract.faucet(address, { gasPrice: 30000000000 * 2.0 })
}
