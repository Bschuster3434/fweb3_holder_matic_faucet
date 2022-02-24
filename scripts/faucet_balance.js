const ethers = require('ethers')

const faucetABI = require('../artifacts/contracts/SchusterEtherFaucet.sol/SchusterEtherFaucet.json')
const { getFaucetContractAddress, getProvider } = require('./deploy_utils')


const checkFaucetBalance = async () => {
  const provider = getProvider()

  const contract = new ethers.Contract(getFaucetContractAddress(), faucetABI.abi, provider)

  const balance = await contract.getBalance()

  console.log('[+] Faucet balance:', balance.toString())
}

checkFaucetBalance().then(() => process.exit(0)).catch(console.error)
