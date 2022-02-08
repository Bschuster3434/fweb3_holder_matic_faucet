import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import tokenContract from "./contracts/SchusterianTestToken.json";
import faucetContract from "./contracts/SchusterEthereumFaucet.json";


const tokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const tokenabi = tokenContract.abi;
const faucetAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const faucetabi = faucetContract.abi;

const url = "http://localhost:8545";

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask installed");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }
   }

  const sendFaucetTokensHandler = async () => {
    try {

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        const signer = provider.getSigner();
        const faucetContract = new ethers.Contract(faucetAddress, faucetabi, signer);
  
        console.log("Getting Ethereum from Faucet");
        let faucetTx = await faucetContract.sendFaucetTokens(1, signer._address);
  
        console.log("Waiting for Transaction to Finish");
        await faucetTx.wait();
  
        console("Mined!");
      }

    } catch (err) {
      console.log("Ethereum object does not exist");
    }
  }

  const sendFaucetTokenButton = () => {
    return (
      <button onClick={sendFaucetTokensHandler} className='cta-button send-faucet-token'>
        Get Ethereum Tokens
      </button>
    )
  }

  const connectWalletHandler = async () => { 
    const {ethereum} = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>Schusterian Token Faucet</h1>
      <div>
        {currentAccount ? sendFaucetTokenButton() : connectWalletButton()}
      </div>
    </div>
  );
}

export default App;
