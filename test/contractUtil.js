const properties = require('./properties.js')
let property = properties.ropsten
// property = properties.mainnet

const Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3()
web3.setProvider(new Web3.providers.HttpProvider(property.url))


async function contractSendSimple(contractAddress, data) {
    let nonce = await web3.eth.getTransactionCount(property.from)
    const gasPrice = property.gasPrice ? property.gasPrice : await web3.eth.getGasPrice()
    contractSend(contractAddress, data, nonce, gasPrice, property.gasLimit, property.from, property.pk)
}

async function contractSend(contractAddress, data, nonce, gasPrice, gasLimit, from, pk) {
    console.log('gasPrice: ', gasPrice)
    console.log('nonce: ', nonce)
    const rawTx = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gasLimit),
        from: from,
        to: contractAddress,
        value: web3.utils.toHex(0),
        data: data
    }
    const tx = new Tx(rawTx)
    const privateKey = new Buffer.from(pk, 'hex')
    tx.sign(privateKey)
    const serializedTx = tx.serialize()
    return await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('transactionHash', hash => {
            console.info('txHash:', hash)
        })
        .catch(error => {
            console.error('contractSend error:', error)
        })
}

async function contractEstimateGas(from, to, data) {
    return await web3.eth.estimateGas({from: from, to: to, data: data}, function (error, estimateGas) {
        console.info('estimateGas:', estimateGas)
    })
}

function getString(hexString) {
    return web3.utils.hexToString(hexString)
}

function getBytes(string) {
    return web3.utils.fromAscii(string)
}

module.exports = {
    web3: web3,
    property:property,
    contractSend: contractSend,
    contractSendSimple: contractSendSimple,
    contractEstimateGas: contractEstimateGas,
    getString: getString,
    getBytes: getBytes
}
