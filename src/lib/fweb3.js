import { ethers } from 'ethers'
import { handleError } from './ethers.utils'
import contract from '../contracts/SchusterEtherFaucet.json'

const { REACT_APP_FAUCET_ACCOUNT_PRIVATE_KEY, REACT_APP_FAUCET_CONTRACT_ADDRESS } = process.env

export const getFaucetWallet = async (provider) => {
  try {
    const wallet =  new ethers.Wallet(
      REACT_APP_FAUCET_ACCOUNT_PRIVATE_KEY,
      provider
    )
    return wallet
  } catch (e) {
    return handleError(e)
  }
}

export const getFaucetContract = (wallet) => {
  try {
    const faucetContract =  new ethers.Contract(
      REACT_APP_FAUCET_CONTRACT_ADDRESS,
      contract.abi,
      wallet
    )
    return faucetContract
  } catch (e) {
    return handleError(e)
  }
}

export const submitFaucetRequest = async (faucetContract, address) => {
  try {
    const tx = await faucetContract.faucet(address, {gasPrice: (30000000000) * 2.0})
    return tx
  } catch (e) {
    return handleError(e)
  }
}
