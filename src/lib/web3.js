import { ethers } from 'ethers'
import contract from '../contracts/SchusterEtherFaucet.json'

const { REACT_APP_FAUCET_CONTRACT_ADDRESS } = process.env
console.log(REACT_APP_FAUCET_CONTRACT_ADDRESS)

export const faucetContract = (signer) => {
  return new ethers.Contract(
    REACT_APP_FAUCET_CONTRACT_ADDRESS ,
    contract.abi, 
    signer
  )
}
