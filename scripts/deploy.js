const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const weiAmount = (await deployer.getBalance()).toString();
    
    console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));
  
    const Token = await ethers.getContractFactory("SchusterianTestToken");
    const token = await Token.deploy();

    const Faucet = await ethers.getContractFactory("SchusterEthereumFaucet");
    const faucet = await Faucet.deploy(token.address);

    console.log("Token address:", token.address);
    console.log("Faucet address: ", faucet.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });