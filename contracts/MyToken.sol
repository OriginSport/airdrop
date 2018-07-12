pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";

contract MyToken is StandardToken, BurnableToken {
    string public name = "Bingo";
    string public symbol = "Bi";
    uint8 public decimals = 18;
    uint256 public initialSupply = 1000000000 * 10 ** uint256(decimals);

    constructor() public {
        totalSupply_ = initialSupply;
        balances[msg.sender] = totalSupply_;
    }
}