const { ethers } = require('hardhat')
const fs = require('fs-extra')

async function main() {
  const signers = await ethers.getSigners()
  const [deployer] = signers
  console.log('[+] deploying token with the account:', deployer.address)

  const tokenContract = await ethers.getContractFactory('SchusterTestToken')
  const token = await tokenContract.deploy()

  console.log('[+] deployedtoken address:', token.address)

  const data = {
    deployer_address: deployer.address,
    token_address: token.address
  }

  fs.writeFileSync('tmp/token_deploy_info', JSON.stringify(data, null, 2))
  fs.writeFileSync('tmp/token_deploy_dump', JSON.stringify(token, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
