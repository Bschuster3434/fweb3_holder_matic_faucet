pragma solidity ^0.8.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SchusterEtherFaucet {

    address private ERC20TokenAddress; //Address of the ERC20 Token we're tracking
    uint256 private faucetDripAmount; //Amount to be sent
    uint private timeout; //Timeout in minutes
    uint private ERC20TokenMinimum; //Minimum amount of tokens needs to be considered for this faucet
    mapping(address => uint) timeouts; //Time of last faucet drip per address

    event sentTokens(address _user, uint _timestamp);

    constructor(address _ERC20TokenAddress, uint _faucetDripBase, uint _faucetDripDecimal, uint _ERC20TokenMinimum, uint _timeout) {
        ERC20TokenAddress = _ERC20TokenAddress; 
        faucetDripAmount = _faucetDripBase * (10**_faucetDripDecimal); //Ether (or Native Token)
        ERC20TokenMinimum = _ERC20TokenMinimum * (10**18); //300 ERC20 Tokens, assumes 18 decimals
        timeout = _timeout; //Timeout in minutes
    }

    function getERC20TokenAddress() external view returns(address) {
        return ERC20TokenAddress;
    }

    function getFaucetDripAmount() external view returns(uint) {
        return faucetDripAmount;
    }

    function getTimeout() external view returns(uint) {
        return timeout;
    }

    function getERC20TokenMinimum() external view returns(uint) {
        return ERC20TokenMinimum;
    }

    function getAddressTimeout(address _user) external view returns(uint) {
        return timeouts[_user];
    }

    function hasERC20Token(address _user) private view returns(bool) {
        ERC20 instance = ERC20(ERC20TokenAddress);
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