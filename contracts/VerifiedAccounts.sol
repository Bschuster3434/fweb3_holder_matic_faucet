// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0 <=0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VerifiedAccounts is Ownable {
    mapping(address => bool) verifiedRunner;

    event RunnerAdded(address indexed _runner);
    event RunnerRemoved(address indexed _runner);

    modifier onlyVerified() {
        require(verifiedRunner[msg.sender], "Not Verified to Run Faucet");
        _;
    }

    function verifyRunner(address _runner) external onlyOwner {
        require(!verifiedRunner[_runner], "Runner Already Verified");
        verifiedRunner[_runner] = true;
        emit RunnerAdded(_runner);
    }
    
    function removeRunner(address _runner) external onlyOwner {
        require(verifiedRunner[_runner], "Runner Not Verified");
        verifiedRunner[_runner] = false;
        emit RunnerRemoved(_runner);        
    } 

}