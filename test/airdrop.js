const {web3, property, contractSend, contractEstimateGas} = require('./contractUtil.js')

const airdropContract = new web3.eth.Contract(property.contractAbi, property.contractAddress)
let nonce = 0x0

async function sendToken(tokenAddress, addresses, value, from, pk) {
    const method = airdropContract.methods.batchTransferToken(tokenAddress, addresses, web3.utils.toWei(value, 'ether'))
    const data = method.encodeABI()
    let currentNonce = await web3.eth.getTransactionCount(from)
    nonce = nonce > currentNonce ? nonce : currentNonce
    const gasPrice = property.gasPrice ? property.gasPrice : await web3.eth.getGasPrice()
    const gasLimit = await method.estimateGas({from:property.from})
    await contractSend(property.contractAddress, data, nonce, gasPrice, gasLimit, from, pk).then(nonce++)
}

// send token
// get address array
const CSVUtil = require('./CSVUtil.js')
const addresses = CSVUtil.getArray('E:\\programme\\project\\myAccount-100.csv')
console.log('address length:', addresses.length)

const value = '0.001'
// send 'times' tx, 'groupLen' accounts each time.
const groupLen = 200    // limit -> mainnet: 200; ropsten: < 180
const times = Math.ceil(addresses.length / groupLen)
for (let i = 0; i < times;) {
    const subAddrArray = addresses.slice(i * groupLen, ++i * groupLen)
    sendToken(property.tokenAddress, subAddrArray, value, property.from, property.pk)
}
