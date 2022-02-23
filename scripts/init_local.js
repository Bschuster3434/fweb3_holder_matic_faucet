const hre = require('hardhat')
const { ethers } = require('ethers')
const faucetABI = require('../artifacts/')
const { TOKEN_CONTRACT_NAME } = require('./deploy_token')
const { FAUCET_CONTRACT_NAME } = require('./deploy_faucet')

const TOKEN_CONTRACT_ADDRESS = '0x5fc8d32690cc91d4c39d9d3abcbd16989f875707'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider()
  const accounts = await provider.listAccounts()
  const signer = await provider.getSigner()

  const tokenContract = new ethers.Contract()
}

main()
  .then(() => process.exit(0))
  .catch(console.error)
