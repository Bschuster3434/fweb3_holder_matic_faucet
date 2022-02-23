const hre = require('hardhat')

const TOKEN_CONTRACT_NAME = 'SchusterTestToken'

const deployToken = async () => {
  const TokenContractFactory = await hre.ethers.getContractFactory(
    TOKEN_CONTRACT_NAME
  )

  const tokenDeployment = await TokenContractFactory.deploy()
  await tokenDeployment.deployed()

  console.log('[+] Token contract address:', tokenDeployment.address)

  return tokenDeployment
}

module.exports = {
  deployToken,
  TOKEN_CONTRACT_NAME
}
