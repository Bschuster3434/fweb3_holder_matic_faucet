require('dotenv').config()

require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const {
  REACT_APP_TESTNET_ALCHEMY_POLYGON_API_KEY,
  REACT_APP_TESTNET_ALCHEMY_POLYGON_URL,
  REACT_APP_MAINNET_ALCHEMY_POLYGON_API_KEY,
  REACT_APP_MAINNET_ALCHEMY_POLYGON_URL,
  REACT_APP_TESTNET_FAUCET_DEPLOYER_ACCOUNT_PRIK,
  REACT_APP_MAINNET_FAUCET_DEPLOYER_ACCOUNT_PRIK,
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
        url: `${REACT_APP_TESTNET_ALCHEMY_POLYGON_URL}/${REACT_APP_TESTNET_ALCHEMY_POLYGON_API_KEY}`,
        accounts: [REACT_APP_TESTNET_FAUCET_DEPLOYER_ACCOUNT_PRIK],
      },
      polygon_mainnet: {
        url: `${REACT_APP_MAINNET_ALCHEMY_POLYGON_URL}/${REACT_APP_MAINNET_ALCHEMY_POLYGON_API_KEY}`,
        accounts: [REACT_APP_MAINNET_FAUCET_DEPLOYER_ACCOUNT_PRIK],
      },
    },
  },
}
