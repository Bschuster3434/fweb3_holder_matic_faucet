import { Web3Provider } from '@ethersproject/providers'
import { Contract } from "@ethersproject/contracts";

import { ethers } from 'ethers'
import contract from '../contracts/SchusterEtherFaucet.json'

const { REACT_APP_FAUCET_CONTRACT_ADDRESS } = process.env
console.log(REACT_APP_FAUCET_CONTRACT_ADDRESS)

export const getLibrary = (provider) => {
  return new Web3Provider(provider)
}

export const faucetContract = async () => {
  try {
    return new ethers.Contract(
      REACT_APP_FAUCET_CONTRACT_ADDRESS,
      contract.abi,
      ethers.getDefaultProvider()
    )
  } catch (e) {
    console.error(e)
  }
}

export const healthCheck = async () => {
  try {
    const tx = await faucetContract.getTimeout()
    return tx
  } catch (e) {}
}

export const sendMaticFromFaucet = async (to) => {
  try {
    console.log(faucetContract)
    const tx = await faucetContract.faucet(to)
    return { ok: true, tx }
  } catch (e) {
    console.error(e.message)
    return { error: e.message }
  }
}
