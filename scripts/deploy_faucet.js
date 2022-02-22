const { deployFaucet } = require('./deployments')

deployFaucet()
  .then(() => {
    process.exit(0)
  })
  .catch(console.error)
