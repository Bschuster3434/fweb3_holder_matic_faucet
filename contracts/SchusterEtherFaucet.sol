pragma solidity ^0.8.0 <=0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SchusterEtherFaucet is Ownable {

    address private tokenAddress; //Address of the ERC20 Token we're tracking
    uint256 private faucetDripAmount; //Amount to be sent in Wei
    uint private timeout; //Timeout in minutes
    uint private ERC20TokenMinimum; //Minimum amount of tokens needs to be considered for this faucet
    mapping(address => uint) timeouts; //Time of last faucet drip per address

    event sentTokens(address _user, uint _timestamp);

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress; 
        faucetDripAmount = 1 * (10**18); //Ether (or Native Token)
        timeout = 60; //Timeout in minutes
        ERC20TokenMinimum = 300 * (10**18); //300 ERC20 Tokens, assuming 18 decimals
    }

    function setTimeout(uint _minutes) external onlyOwner {
        timeout = _minutes;
    }

    function getTimeout() external view returns(uint) {
        return(timeout);
    }

    function hasERC20Token(address _user) private view returns(bool) {
        ERC20 instance = ERC20(tokenAddress);
        if( instance.balanceOf(_user) >= ERC20TokenMinimum ) {
            return true;
        } else {
            return false;
        }
    }

    function faucet(address payable _to) external {
        require(address(this).balance >= faucetDripAmount, "Insufficient Faucet Funds");
        require(timeouts[_to] <= block.timestamp - (timeout * 1 minutes), "Too Early for Another Faucet Drop");
        require(hasERC20Token(_to), "You Do Not Have Enough ERC20 tokens");
        timeouts[_to] = block.timestamp;
        (bool sent, ) = _to.call{value: faucetDripAmount}("");
        require(sent, "Failed to send Ether");
        emit sentTokens(_to, block.timestamp);
    }

    function getBalance() view external returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {
    }

    receive() external payable {
    }

}