const { ethers } = require("hardhat");

async function main() {
    //Defining the Mumbai Testnet Variables
    let token_address = "0x4a14ac36667b574b08443a15093e417db909d7a3"; //FWEB3 (pos) token address
    let faucetDripBase = 1;
    let faucetDripDecimal = 17; //Will make this give out .1 MATIC Tokens
    let ERC20TokenMinimum = 100; // 100 ERC20 Tokens Needed
    let timeout = 60 * 24 ; // 60 minutes * 24 Hours = 1 Day

    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);

    const Faucet = await ethers.getContractFactory("SchusterEtherFaucet");
    const faucet = await Faucet.deploy(token_address, faucetDripBase, faucetDripDecimal, ERC20TokenMinimum, timeout);

    console.log("ERC20 Token address:", token_address);
    console.log("Faucet address: ", faucet.address);
    console.log("ERC 20 Token Miniumum Require: ", ERC20TokenMinimum);
    console.log("Faucet Drip Amount (in MATIC): ", (faucetDripBase * (10**faucetDripDecimal))/(10**18));
    console.log("Timeout in Minutes: ", timeout);
    console.log("Faucet currently has a MATIC balance of: " + await faucet.getBalance());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });