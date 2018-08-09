const fs = require('fs')


module.exports = {
    getArray: function getArray(filePath) {
        const data = fs.readFileSync(filePath)
        const string = String(data).replace('\ufeff', '')
        const arr = string.split('\r\n')
        // validate address
        for (x in arr) {
            if (!arr[x].startsWith('0x') || !(arr[x].length === 42)) {
                return
            }
        }
        return arr
    }
}