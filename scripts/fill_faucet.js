require('dotenv').config()

const ethers = require('ethers')
const { getDeployerAccountPrivateKey, getFaucetContractAddress, getProvider } = require('./deploy_utils')

const fillFaucet = async (amount) => {
  const faucetContractAddress = getFaucetContractAddress()
  const ethAmount = ethers.utils.parseEther(amount)
  const provider = getProvider()

  const wallet = await new ethers.Wallet(
    getDeployerAccountPrivateKey(),
    provider
  )

  const tx = await wallet.sendTransaction({
    to: faucetContractAddress,
    value: ethAmount,
  })

  console.log(`[+] sent ${amount} eth from ${tx.from} to faucet at ${tx.to}`)
}

const amount = process.argv[2]
if (amount === 'local' || amount === 'localhost') {
  fillFaucet('420').then(() => process.exit(0)).catch(console.error)
} else if (!amount) {
  console.log('[-] missing eth amount')
  process.exit(1)
} else {
  fillFaucet(amount).then(() => process.exit(0)).catch(console.error)
}

