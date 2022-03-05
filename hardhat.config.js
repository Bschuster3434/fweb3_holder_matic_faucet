require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const {
  ALCHEMY_POLYGON_TESTNET_API_KEY,
  ALCHEMY_POLYGON_MAINNET_API_KEY,
  METAMASK_TEST_ACCOUNT_3_PRIK,
  METAMASK_TEST_ACCOUNT_4_PRIK,
  METAMASK_TEST_ACCOUNT_5_PRIK,
  METAMASK_DEPLOYER_ACCOUNT_PRIK,
  TEST_NETWORK_BASE_URL,
  PROD_NETWORK_BASE_URL,
  POLYGONSCAN_API_KEY,
} = process.env

module.exports = {
  solidity: "0.8.4",
  networks: {
    polygonMumbai: {
      url: `${TEST_NETWORK_BASE_URL}/${ALCHEMY_POLYGON_TESTNET_API_KEY}`,
      accounts: [
        METAMASK_TEST_ACCOUNT_3_PRIK,
        METAMASK_TEST_ACCOUNT_4_PRIK,
        METAMASK_TEST_ACCOUNT_5_PRIK,
      ],
    },
    localhost: {
      url: "http://localhost:8545"
    },
    polygon: {
      url: `${PROD_NETWORK_BASE_URL}/${ALCHEMY_POLYGON_MAINNET_API_KEY}`,
      accounts: [
        METAMASK_DEPLOYER_ACCOUNT_PRIK
      ],
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY
    }
  }
}
