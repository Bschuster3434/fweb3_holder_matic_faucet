pragma solidity ^0.8.0 <=0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SchusterEthereumFaucet is Ownable {

    address tokenAddress;
    mapping(address => bool) tokensReceived;
    uint256 faucetDripAmount = 1; //Amount in Ether

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function fillFaucet() external payable {

    }

    function sendFaucetTokens(address payable _to) view external {
        require(tokensReceived[_to] == false, "You have already received tokens");

    }

}