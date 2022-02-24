require('dotenv').config()
const hre = require('hardhat')

const { getRequiredTokenContractAddress } = require('../deploy_utils')

const { FAUCET_CONTRACT_NAME } = process.env

const DEFAULT_FAUCET_CONFIG = {
  dripBase: 10,
  dripDecimal: 10,
  requiredTokenMinimum: 1,
  dripTimeout: 1, // in min
}

const deployFaucet = async () => {
  const FaucetContractFactory = await hre.ethers.getContractFactory(
    FAUCET_CONTRACT_NAME
  )

  const faucetDeployment = await FaucetContractFactory.deploy(
    getRequiredTokenContractAddress(),
    DEFAULT_FAUCET_CONFIG.dripBase,
    DEFAULT_FAUCET_CONFIG.dripDecimal,
    DEFAULT_FAUCET_CONFIG.requiredTokenMinimum,
    DEFAULT_FAUCET_CONFIG.dripTimeout
  )
  await faucetDeployment.deployed()

  console.log('[+] Faucet Contract Address:', faucetDeployment.address)

  return faucetDeployment
}

module.exports = { deployFaucet }
