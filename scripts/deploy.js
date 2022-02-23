require('dotenv').config()
const { deployToken } = require('./deploy_token')
const { deployFaucet } = require('./deploy_faucet')

async function main() {
  const tokenDeployment = await deployToken()
  const tokenContractAddress = tokenDeployment.address
  await deployFaucet(tokenContractAddress)
}

main()
  .then(() => {
    console.log('[+] Deployed!')
    process.exit(0)
  })
  .catch(console.error)
