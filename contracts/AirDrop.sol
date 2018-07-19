pragma solidity ^0.4.24;

contract ERC20Token {
    function transferFrom(address from, address to, uint value) public returns (bool);
}

contract AirDrop {

    /** ORS token */
    ERC20Token public ORSToken;

    constructor() public {
        ORSToken = ERC20Token(0x0A22dccF5Bd0fAa7E748581693E715afefb2F679);
    }

    function() payable public {}

    /**
     * batch transfer for ORS token.(the same amount)
     *
     * @param _addresses array of address to sent
     * @param _value transfer amount
     */
    function batchTransferORS(address[] _addresses, uint _value) public {
        // transfer circularly
        for (uint i = 0; i < _addresses.length; i++) {
            ORSToken.transferFrom(msg.sender, _addresses[i], _value);
        }
    }

    /**
     * batch transfer for ORS token.
     *
     * @param _addresses array of address to sent
     * @param _value array of transfer amount
     */
    function batchTransferORSS(address[] _addresses, uint[] _value) public {
        require(_addresses.length == _value.length);

        // transfer circularly
        for (uint i = 0; i < _addresses.length; i++) {
            ORSToken.transferFrom(msg.sender, _addresses[i], _value[i]);
        }
    }

    /**
     * batch transfer for ERC20 token.(the same amount)
     *
     * @param _contractAddress ERC20 token address
     * @param _addresses array of address to sent
     * @param _value transfer amount
     */
    function batchTransferToken(address _contractAddress, address[] _addresses, uint _value) public {
        ERC20Token token = ERC20Token(_contractAddress);
        // transfer circularly
        for (uint i = 0; i < _addresses.length; i++) {
            token.transferFrom(msg.sender, _addresses[i], _value);
        }
    }

    /**
     * batch transfer for ERC20 token.
     *
     * @param _contractAddress ERC20 token address
     * @param _addresses array of address to sent
     * @param _value array of transfer amount
     */
    function batchTransferTokenS(address _contractAddress, address[] _addresses, uint[] _value) public {
        require(_addresses.length == _value.length);

        ERC20Token token = ERC20Token(_contractAddress);
        // transfer circularly
        for (uint i = 0; i < _addresses.length; i++) {
            token.transferFrom(msg.sender, _addresses[i], _value[i]);
        }
    }

    /**
     * batch transfer for ETH.(the same amount)
     *
     * @param _addresses array of address to sent
     */
    function batchTransferETH(address[] _addresses) payable public {
        // transfer circularly
        for (uint i = 0; i < _addresses.length; i++) {
            _addresses[i].transfer(msg.value / _addresses.length);
        }
    }

    /**
     * batch transfer for ETH.
     *
     * @param _addresses array of address to sent
     * @param _value array of transfer amount
     */
    function batchTransferETHS(address[] _addresses, uint[] _value) payable public {
        require(_addresses.length == _value.length);

        // transfer circularly
        for (uint i = 0; i < _addresses.length; i++) {
            _addresses[i].transfer(_value[i]);
        }
    }
}
