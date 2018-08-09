module.exports = {
    development: {
        contractAbi: [],
        contractAddress: '',  //
        url: 'http://127.0.0.1:7545',
        from: '',
        pk: '',
        gasPrice: 10000000000,
        gasLimit: 4100000
    },
    ropsten: {
        contractAbi: [{"constant":false,"inputs":[{"name":"_addresses","type":"address[]"},{"name":"_value","type":"uint256[]"}],"name":"batchTransferETHS","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_addresses","type":"address[]"}],"name":"batchTransferETH","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddress","type":"address"},{"name":"_addresses","type":"address[]"},{"name":"_value","type":"uint256[]"}],"name":"batchTransferTokenS","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddress","type":"address"},{"name":"_addresses","type":"address[]"},{"name":"_value","type":"uint256"}],"name":"batchTransferToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"}],
        contractAddress: '0x6804eB794ab71BFdF43a64056Db0b22E09249698',  //AirDrop_1.3
        url: 'https://ropsten.infura.io/',
        tokenAddress: '0x0A22dccF5Bd0fAa7E748581693E715afefb2F679', // ORS
        from: '',
        pk: '',
        gasPrice: 10000000000,
        gasLimit: 4100000
    },
    mainnet: {
        contractAbi: [{"constant":false,"inputs":[{"name":"_addresses","type":"address[]"},{"name":"_value","type":"uint256[]"}],"name":"batchTransferETHS","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_addresses","type":"address[]"}],"name":"batchTransferETH","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddress","type":"address"},{"name":"_addresses","type":"address[]"},{"name":"_value","type":"uint256[]"}],"name":"batchTransferTokenS","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddress","type":"address"},{"name":"_addresses","type":"address[]"},{"name":"_value","type":"uint256"}],"name":"batchTransferToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"}],
        contractAddress: '0x811437D9FbE43bE7ECff117d9986253C36bc2438',
        url: 'https://mainnet.infura.io/',
        tokenAddress: '0xEB9A4B185816C354dB92DB09cC3B50bE60b901b6', // ORS
        from: '',
        pk: '',
        gasPrice: 2000000000,
        gasLimit: 7800000
    }
}