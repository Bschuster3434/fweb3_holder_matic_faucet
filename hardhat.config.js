require('dotenv').config()

require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const {
  REACT_APP_ALCHEMY_POLYGON_TESTNET_API_KEY,
  REACT_APP_ALCHEMY_POLYGON_TESTNET_URL,
  REACT_APP_ALCHEMY_POLYGON_MAINNET_API_KEY,
  REACT_APP_ALCHEMY_POLYGON_MAINNET_URL,
  REACT_APP_FAUCET_TESTNET_DEPLOYER_ACCOUNT_PRIK,
  REACT_APP_FAUCET_MAINNET_DEPLOYER_ACCOUNT_PRIK,
} = process.env

// eslint-disable-next-line
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})
module.exports = {
  solidity: '0.8.0',
  networks: {
    hardhat: {
      polygon_mumbai: {
        url: `${REACT_APP_ALCHEMY_POLYGON_TESTNET_URL}/${REACT_APP_ALCHEMY_POLYGON_TESTNET_API_KEY}`,
        accounts: [REACT_APP_FAUCET_TESTNET_DEPLOYER_ACCOUNT_PRIK],
      },
      polygon_mainnet: {
        url: `${REACT_APP_ALCHEMY_POLYGON_MAINNET_URL}/${REACT_APP_ALCHEMY_POLYGON_MAINNET_API_KEY}`,
        accounts: [REACT_APP_FAUCET_MAINNET_DEPLOYER_ACCOUNT_PRIK],
      },
    },
  },
}
