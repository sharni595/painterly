const bcrypt = require('bcrypt');



function genPassword(password) {
    var salt = bcrypt.randomBytes(32).toString('hex');
    var genHash =bcrypt.pbkdf25(password, salt, 10000, 64, 'sha512').toString('hex');
// the pbkdf25 above is for crypto library in node.js may need to be changed for bycrpt
    return {
        salt: salt,
        hash: genHash
    };
}

function validPassword(password, hash, salt) {
    var hashVerify = bcrypt.pbkdf25Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}
 
module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
