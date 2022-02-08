pragma solidity ^0.8.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SchusterianTestToken is ERC20 {

    uint constant _initial_supply = 100 * (10**18);

    constructor() ERC20("SchusterianTestToken", "STT") {
        _mint(msg.sender, _initial_supply);
    }
}