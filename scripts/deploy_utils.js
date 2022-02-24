require('dotenv').config()

const ethers = require('ethers')

const {
  REACT_APP_ETH_NETWORK,
  REACT_APP_LOCALNET_REQUIRED_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_TESTNET_REQUIRED_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_MAINNET_REQUIRED_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_LOCALNET_DEPLOYER_ACCOUNT_PRIK,
  REACT_APP_TESTNET_DEPLOYER_ACCOUNT_PRIK,
  REACT_APP_MAINNET_DEPLOYER_ACCOUNT_PRIK,
  REACT_APP_LOCALNET_FAUCET_CONTRACT_ADDRESS,
  REACT_APP_TESTNET_FAUCET_CONTRACT_ADDRESS,
  REACT_APP_MAINNET_FAUCET_CONTRACT_ADDRESS,
} = process.env

const getFaucetContractAddress = () => {
  switch(REACT_APP_ETH_NETWORK) {
    case 'testnet':
      return REACT_APP_TESTNET_FAUCET_CONTRACT_ADDRESS
    case 'mainnet':
      return REACT_APP_MAINNET_FAUCET_CONTRACT_ADDRESS
    default:
      return REACT_APP_LOCALNET_FAUCET_CONTRACT_ADDRESS
  }
}

const getRequiredTokenContractAddress = () => {
  switch (REACT_APP_ETH_NETWORK) {
    case 'testnet':
      return REACT_APP_TESTNET_REQUIRED_TOKEN_CONTRACT_ADDRESS
    case 'mainnet':
      return REACT_APP_MAINNET_REQUIRED_TOKEN_CONTRACT_ADDRESS
    default:
      return REACT_APP_LOCALNET_REQUIRED_TOKEN_CONTRACT_ADDRESS
  }
}

const getDeployerAccountPrivateKey = () => {
  switch(REACT_APP_ETH_NETWORK) {
    case 'mainnet':
      return REACT_APP_MAINNET_DEPLOYER_ACCOUNT_PRIK
    case 'testnet':
      return REACT_APP_TESTNET_DEPLOYER_ACCOUNT_PRIK
    default:
      return REACT_APP_LOCALNET_DEPLOYER_ACCOUNT_PRIK
  }
}

const getProvider = () => {
  switch(REACT_APP_ETH_NETWORK) {
    case 'mainnet':
      return new ethers.providers.AlchemyProvider('matic')
    case 'testnet':
      return new ethers.providers.AlchemyProvider('maticmum')
    default:
      return new ethers.providers.JsonRpcProvider()
  }
}

module.exports = {
  getRequiredTokenContractAddress,
  getDeployerAccountPrivateKey,
  getFaucetContractAddress,
  getProvider
}
