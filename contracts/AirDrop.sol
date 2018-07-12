pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract StandardToken {
    function totalSupply() public view returns (uint256);

    function balanceOf(address who) public view returns (uint256);

    function transfer(address to, uint256 value) public returns (bool);

    function allowance(address owner, address spender) public view returns (uint256);

    function transferFrom(address from, address to, uint256 value) public returns (bool);

    function approve(address spender, uint256 value) public returns (bool);
}

contract AirDrop is Ownable {

    using SafeMath for uint;

    function () payable public {}

    /**
     * batch transfer for ERC20 token.(the same amount)
     *
     * @param _contractAddress ERC20 token address
     * @param _addresses array of address to sent
     * @param _value transfer amount
     */
    function batchTransferToken(address _contractAddress, address[] _addresses, uint _value) onlyOwner public {
        // data validate & _addresses length limit
        require(_addresses.length > 0);

        StandardToken token = StandardToken(_contractAddress);
        // transfer circularly
        for (uint i = 0; i < _addresses.length; i++) {
            token.transfer(_addresses[i], _value);
        }
    }

    /**
     * batch transfer for ERC20 token.
     *
     * @param _contractAddress ERC20 token address
     * @param _addresses array of address to sent
     * @param _value array of transfer amount
     */
    function batchTransferToken(address _contractAddress, address[] _addresses, uint[] _value) onlyOwner public {
        // data validate & _addresses length limit
        require(_addresses.length > 0);
        require(_addresses.length == _value.length);

        StandardToken token = StandardToken(_contractAddress);
        // transfer circularly
        for (uint i = 0; i < _addresses.length; i++) {
            token.transfer(_addresses[i], _value[i]);
        }
    }

    /**
     * batch transfer for ETH.(the same amount)
     *
     * @param _addresses array of address to sent
     */
    function batchTransferETH(address[] _addresses) onlyOwner payable public {
        // data validate & _addresses length limit
        require(_addresses.length > 0);

        // transfer circularly
        for (uint i = 0; i < _addresses.length; i++) {
            _addresses[i].transfer(msg.value.div(_addresses.length));
        }
    }

    /**
     * batch transfer for ETH.
     *
     * @param _addresses array of address to sent
     * @param _value array of transfer amount
     */
    function batchTransferETHs(address[] _addresses, uint[] _value) onlyOwner payable public {
        // data validate & _addresses length limit
        require(_addresses.length > 0);
        require(_addresses.length == _value.length);

        // transfer circularly
        for (uint i = 0; i < _addresses.length; i++) {
            _addresses[i].transfer(_value[i]);
        }
    }
}
