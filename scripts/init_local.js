require('dotenv').config()
const { ethers } = require('ethers')
const tokenABI = require('../artifacts/contracts/SchusterianTestToken.sol/SchusterTestToken.json')
const { REACT_APP_MAINNET_TOKEN_CONTRACT_ADDRESS } = process.env

async function main() {
  const provider = new ethers.providers.JsonRpcProvider()
  const accounts = await provider.listAccounts()
  const signer = await provider.getSigner()

  const tokenContract = new ethers.Contract(
    REACT_APP_MAINNET_TOKEN_CONTRACT_ADDRESS,
    tokenABI.abi,
    signer
  )
  console.log('[+] Sending 100 test tokens to', accounts[1])
  await tokenContract.transfer(accounts[1], 100)
}

main()
  .then(() => process.exit(0))
  .catch(console.error)
