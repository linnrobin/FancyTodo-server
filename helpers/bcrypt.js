const bcrypt = require('bcryptjs');

function encryptPass(pass) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(pass, salt)
    return(hash)
}

function decryptPass(pass, hash) {
    return bcrypt.compareSync(pass, hash)
}

module.exports = {encryptPass, decryptPass}