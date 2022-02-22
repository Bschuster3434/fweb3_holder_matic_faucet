const { deployToken } = require('./deployments')

deployToken()
  .then(() => {
    process.exit(0)
  })
  .catch(console.error)
