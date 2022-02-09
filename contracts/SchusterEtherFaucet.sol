pragma solidity ^0.8.0 <=0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SchusterEtherFaucet is Ownable {

    address tokenAddress;
    uint256 faucetDripAmount; //Amount in Wei
    uint timeout; //Timeout in minutes
    uint ERC20TokenMinimum;
    mapping(address => uint) timeouts;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
        faucetDripAmount = 1 * (10**18); //1 Ether
        timeout = 24 hours;
        ERC20TokenMinimum = 300 * (10**18); //300 ERC20 Tokens, assuming 18 decimals
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
        require(timeouts[_to] <= block.timestamp - timeout, "Too Early for Another Faucet Drop");
        require(hasERC20Token(_to), "You Do Not Have Enough ERC20 tokens");
        timeouts[_to] = block.timestamp;
        (bool sent, ) = _to.call{value: faucetDripAmount}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance() view external returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {
    }

    receive() external payable {
    }

}