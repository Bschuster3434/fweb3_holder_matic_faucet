require('dotenv').config()

const ethers = require('ethers')
const tokenABI = require('../artifacts/contracts/SchusterianTestToken.sol/SchusterTestToken.json')

const {
  getRequiredTokenContractAddress,
  getProvider,
} = require('./deploy_utils')

const { REACT_APP_LOCALNET_USER_ACCOUNT_PUB } = process.env

const sendRequiredTokens = async (address, amount) => {
  const ethAmount = ethers.utils.parseEther(amount)
  const provider = getProvider()
  const signer = await provider.getSigner()
  const tokenContract = new ethers.Contract(
    getRequiredTokenContractAddress(),
    tokenABI.abi,
    signer
  )
  const tx = await tokenContract.transfer(address, ethAmount)
  console.log(`[+] sent ${ethAmount} tokens to ${tx.to}`)
  console.log('from: ', tx.from)
  return tx
}

const sendAddress = process.argv[2]
const sendAmount = process.argv[3]

if (sendAddress === 'local') {
  sendRequiredTokens(REACT_APP_LOCALNET_USER_ACCOUNT_PUB, '666')
    .then(() => process.exit(0))
    .catch(console.error)
} else if (!sendAddress || !sendAmount) {
  console.log('[-] missing args. need <address> <amount>')
  process.exit(1)
} else {
  sendRequiredTokens(sendAddress, sendAmount)
    .then(() => process.exit(0))
    .catch(console.error)
}
