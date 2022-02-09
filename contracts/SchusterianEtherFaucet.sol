pragma solidity ^0.8.0 <=0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SchusterEthereumFaucet is Ownable {

    address tokenAddress;
    uint256 tokenBalance;
    mapping(address => bool) tokensReceived;
    uint256 faucetDripAmount = 1 * (10**18); //Amount in Ether

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function sendFaucetTokens(address payable _to) external {
        require(tokensReceived[_to] == false, "You have already received tokens");
        //Change tokensReceived to True
        tokensReceived[_to] = true;
        //Send tokens to account from address
        (bool sent, ) = _to.call{value: faucetDripAmount}("");
        require(sent, "Failed to send Ether!");
    }

    function getBalance() view external returns (uint256) {
        return tokenBalance;
    }

    function sentTokens(address _user) view external returns (bool) {
        return tokensReceived[_user];
    }

    fallback() external payable {
        tokenBalance += msg.value;
    }

    receive() external payable {
        tokenBalance += msg.value;
    }

}