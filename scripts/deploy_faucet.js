require('dotenv').config()

const { ethers } = require('hardhat')
const fs = require('fs-extra')

const { REACT_APP_TOKEN_ADDRESS } = process.env

const FAUCET_DRIP_BASE = 1
const FAUCET_DRIP_DECIMAL = 16 //Will make this give out .01 Tokens
const ERC20_TOKEN_MIN = 3 // 3 ERC20 Tokens Needed
const TIMEOUT = 1 // 1 Minute

async function main() {
  const signers = await ethers.getSigners()
  const [deployer] = signers

  console.log('[+] Deploying faucet with the account:', deployer.address)

  const faucetContract = await ethers.getContractFactory('SchusterEtherFaucet')
  const faucet = await faucetContract.deploy(
    REACT_APP_TOKEN_ADDRESS,
    FAUCET_DRIP_BASE,
    FAUCET_DRIP_DECIMAL,
    ERC20_TOKEN_MIN,
    TIMEOUT
  )

  await deployer.sendTransaction({
    to: faucet.address,
    value: ethers.utils.parseEther('1'),
  })

  const dripAmount = (FAUCET_DRIP_BASE * 10 ** FAUCET_DRIP_DECIMAL) / 10 ** 18
  const faucetBalance = await faucet.getBalance()

  const deployData = {
    erc20_token_address: REACT_APP_TOKEN_ADDRESS,
    faucet_address: faucet.address,
    token_min_required: ERC20_TOKEN_MIN,
    drip_amount: dripAmount,
    drip_timeout: TIMEOUT,
    faucet_balance: faucetBalance,
  }

  const dumpData = {
    faucet,
    deployer
  }
  const formattedDumpData = JSON.stringify(dumpData, null, 2)
  const formattedDeployData = JSON.stringify(deployData, null, 2)

  fs.writeFileSync('tmp/faucet_deploy_info', formattedDeployData)
  fs.writeFileSync('tmp/faucet_deploy_dump', formattedDumpData)
  console.log(formattedDeployData)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
