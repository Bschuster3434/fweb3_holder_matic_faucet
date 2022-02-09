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

    //Fill Faucet with 100 Ethereum
    const param = { to: faucet.address, value: ethers.utils.parseUnits("100", "ether").toHexString() };
    const txHash0 = await deployer.sendTransaction(param);

    console.log("Token address:", token.address);
    console.log("Faucet address: ", faucet.address);
    console.log("Faucet has been seen the following volume in ETH: " + faucet.getBalance());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });