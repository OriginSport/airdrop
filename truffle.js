const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic = ''

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    networks: {
        private: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
        ropsten: {
            provider: function () {
                return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/')
            },
            network_id: 3,
            gas: 4000000,
            gasPrice: 10000000000
        },
        mainnet: {
            provider: function () {
                return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/')
            },
            network_id: 1,
            gas: 900000,
            gasPrice: 10000000000
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
