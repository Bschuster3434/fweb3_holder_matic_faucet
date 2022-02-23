const hre = require('hardhat')

const FAUCET_CONTRACT_NAME = 'SchusterEtherFaucet'

const DEFAULT_FAUCET_CONFIG = {
  dripBase: 10,
  dripDecimal: 10,
  requiredTokenMinimum: 1,
  dripTimeout: 1, // in min
}

const deployFaucet = async (requiredTokenAddress) => {
  const FaucetContractFactory = await hre.ethers.getContractFactory(
    FAUCET_CONTRACT_NAME
  )

  const faucetDeployment = await FaucetContractFactory.deploy(
    requiredTokenAddress,
    DEFAULT_FAUCET_CONFIG.dripBase,
    DEFAULT_FAUCET_CONFIG.dripDecimal,
    DEFAULT_FAUCET_CONFIG.requiredTokenMinimum,
    DEFAULT_FAUCET_CONFIG.dripTimeout
  )
  await faucetDeployment.deployed()

  console.log('[+] Faucet contract address:', faucetDeployment.address)

  return faucetDeployment
}

module.exports = {
  deployFaucet,
  FAUCET_CONTRACT_NAME,
}
