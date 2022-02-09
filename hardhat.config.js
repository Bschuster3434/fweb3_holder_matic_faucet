require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 ALCHEMY_POLYGON_MUMBAI_API_KEY = process.env.ALCHEMY_POLYGON_MUMBAI_API_KEY;
 METAMASK_TEST_ACCOUNT_3_PRIK = process.env.METAMASK_TEST_ACCOUNT_3_PRIK;
 METAMASK_TEST_ACCOUNT_4_PRIK = process.env.METAMASK_TEST_ACCOUNT_4_PRIK;
 METAMASK_TEST_ACCOUNT_5_PRIK = process.env.METAMASK_TEST_ACCOUNT_5_PRIK;


module.exports = {
  solidity: "0.8.0",
  networks: {
    polygon_mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_POLYGON_MUMBAI_API_KEY}`,
      accounts: [`${METAMASK_TEST_ACCOUNT_3_PRIK}`,`${METAMASK_TEST_ACCOUNT_4_PRIK}`,`${METAMASK_TEST_ACCOUNT_5_PRIK}`]
    }
  }
};
