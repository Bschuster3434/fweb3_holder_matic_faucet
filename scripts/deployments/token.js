require('dotenv').config()

const hre = require('hardhat')

const { TOKEN_CONTRACT_NAME } = process.env

const deployToken = async () => {
  const TokenContractFactory = await hre.ethers.getContractFactory(
    TOKEN_CONTRACT_NAME
  )

  const tokenDeployment = await TokenContractFactory.deploy()
  await tokenDeployment.deployed()

  console.log('[+] Token Contract Address:', tokenDeployment.address)
  
  return tokenDeployment
}

module.exports = {
  deployToken,
}
