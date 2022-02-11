const { ethers } = require("hardhat");

async function main() {
    //Defining the Mumbai Testnet Variables
    let token_address = "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1";
    let faucetDripBase = 1;
    let faucetDripDecimal = 16; //Will make this give out .01 Tokens
    let ERC20TokenMinimum = 3; // 3 ERC20 Tokens Needed
    let timeout = 1; // 1 Minute

    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);

    const Faucet = await ethers.getContractFactory("SchusterEtherFaucet");
    const faucet = await Faucet.deploy(token_address, faucetDripBase, faucetDripDecimal, ERC20TokenMinimum, timeout);

    const fiilFaucetTx = await deployer.sendTransaction({
      to: faucet.address,
      value: ethers.utils.parseEther('1'),
    })

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