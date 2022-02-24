import { ethers } from 'ethers'

import contract from '../contracts/SchusterEtherFaucet.json'

const {
  REACT_APP_ETH_NETWORK = 'testnet',
  REACT_APP_LOCALNET_DEPLOYER_ACCOUNT_PRIK,
  REACT_APP_LOCALNET_FAUCET_CONTRACT_ADDRESS,
  REACT_APP_TESTNET_FAUCET_DEPLOYER_ACCOUNT_PRIK,
  REACT_APP_TESTNET_FAUCET_CONTRACT_ADDRESS,
  REACT_APP_MAINNET_FAUCET_DEPLOYER_ACCOUNT_PRIK,
  REACT_APP_MAINNET_FAUCET_CONTRACT_ADDRESS,
  REACT_APP_GAS_MULTIPLIER = 2.0
} = process.env

const getPrivateKey = () => {
  switch (REACT_APP_ETH_NETWORK) {
    case 'mainnet':
      return REACT_APP_MAINNET_FAUCET_DEPLOYER_ACCOUNT_PRIK
    case 'testnet':
      return REACT_APP_TESTNET_FAUCET_DEPLOYER_ACCOUNT_PRIK
    default:
      // Deployer is same for both faucet and token locally
      return REACT_APP_LOCALNET_DEPLOYER_ACCOUNT_PRIK
  }
}

export const getContractAddress = () => {
  switch (REACT_APP_ETH_NETWORK) {
    case 'mainnet':
      return REACT_APP_MAINNET_FAUCET_CONTRACT_ADDRESS
    case 'testnet':
      return REACT_APP_TESTNET_FAUCET_CONTRACT_ADDRESS
    default:
      return REACT_APP_LOCALNET_FAUCET_CONTRACT_ADDRESS
  }
}

export const getFaucetWallet = async (provider) => {
  const privk = getPrivateKey()
  return new ethers.Wallet(privk, provider)
}

export const getFaucetContract = (wallet) => {
  const address = getContractAddress()
  return new ethers.Contract(address, contract.abi, wallet)
}

export const submitFaucetRequest = async (faucetContract, address) => {
  return faucetContract.faucet(address, { gasPrice: 30000000000 * REACT_APP_GAS_MULTIPLIER })
}
