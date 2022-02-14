require('dotenv').config()

require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const {
  REACT_APP_ALCHEMY_POLYGON_API_KEY,
  REACT_APP_METAMASK_TEST_ACCOUNT_3_PRIK,
  REACT_APP_METAMASK_TEST_ACCOUNT_4_PRIK,
  REACT_APP_METAMASK_TEST_ACCOUNT_5_PRIK,
  REACT_APP_TEST_NETWORK_BASE_URL,
  // REACT_APP_PROD_NETWORK_BASE_URL
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
    polygon_mumbai: {
      url: `${REACT_APP_TEST_NETWORK_BASE_URL}/${REACT_APP_ALCHEMY_POLYGON_TESTNET_API_KEY}`,
      accounts: [
        REACT_APP_METAMASK_TEST_ACCOUNT_3_PRIK,
        REACT_APP_METAMASK_TEST_ACCOUNT_4_PRIK,
        REACT_APP_METAMASK_TEST_ACCOUNT_5_PRIK,
      ],
    },
    localhost: {
      url: "http://localhost:8545"
    },
    polygon_mainnet: {
      url: `${REACT_APP_PROD_NETWORK_BASE_URL}/${REACT_APP_ALCHEMY_POLYGON_MAINNET_API_KEY}`,
      accounts: [
        REACT_APP_METAMASK_DEPLOYER_ACCOUNT_PRIK
      ],
    }  
  },
}
