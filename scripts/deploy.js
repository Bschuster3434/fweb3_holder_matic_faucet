const { deployToken } = require('./deploy_token')
const { deployFaucet } = require('./deploy_faucet')

async function main() {
  const tokenDeployment = await deployToken()
  const tokenContractAddress = tokenDeployment.address
  const faucetDeployment = await deployFaucet(tokenContractAddress)

  console.log(faucetDeployment.address)
}

main()
  .then(() => {
    console.log('[+] Deployed!')
    process.exit(0)
  })
  .catch(console.error)
