require('dotenv').config();

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const {
  ALCHEMY_POLYGON_MUMBAI_API_KEY,
  METAMASK_TEST_ACCOUNT_3_PRIK,
  METAMASK_TEST_ACCOUNT_4_PRIK,
  METAMASK_TEST_ACCOUNT_5_PRIK
} = process.env

// eslint-disable-next-line
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.0",
  networks: {
    polygon_mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_POLYGON_MUMBAI_API_KEY}`,
      accounts: [`${METAMASK_TEST_ACCOUNT_3_PRIK}`,`${METAMASK_TEST_ACCOUNT_4_PRIK}`,`${METAMASK_TEST_ACCOUNT_5_PRIK}`]
    }
  }
};
