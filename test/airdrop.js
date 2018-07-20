var Tx = require('ethereumjs-tx')
var Web3 = require('web3')

var properties = require('./propertites.js')
var property = properties.debug
// property = properties.mainnet

var web3 = new Web3()
web3.setProvider(new Web3.providers.HttpProvider(property.url));

var airdropContract = new web3.eth.Contract(property.contractAbi, property.contractAddress)

var realNonce = 0x0;

async function sendToken(tokenAddress, addresses, value, from, pk) {
    var data = airdropContract.methods.batchTransferToken(tokenAddress, addresses, web3.utils.toWei(value, 'ether')).encodeABI()
    var nonce = await web3.eth.getTransactionCount(from)
    nonce = realNonce > nonce ? realNonce : nonce;
    contractSend(property.contractAddress, data, nonce, from, pk)
    realNonce = nonce + 1;
}

async function contractSend(contractAddress, data, nonce, from, pk) {
    var gasPrice = property.gasPrice ? property.gasPrice : await web3.eth.getGasPrice()
    console.log('gasPrice: ', gasPrice)
    console.log('nonce: ', nonce)
    var rawTx = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(property.gasLimit),
        from: from,
        to: contractAddress,
        value: web3.utils.toHex(0),
        data: data
    }

    var privateKey = new Buffer.from(pk, 'hex')
    var tx = new Tx(rawTx)
    tx.sign(privateKey)
    var serializedTx = tx.serialize()

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('transactionHash', hash => {
            console.info('txHash:', hash)
        })
        .catch(error => {
            console.error('contractSend error:', error)
        })
}

// send token
var addresses = []
var value = '30'
var groupLen = 100  // limit -> mainnet: 200; ropsten: < 180
var times = Math.ceil(addresses.length / groupLen)
for (var i = 0; i < times;) {
    var subAddrArray = addresses.slice(i * groupLen, ++i * groupLen)
    sendToken(property.tokenAddress, subAddrArray, value, property.from, property.pk)
}
