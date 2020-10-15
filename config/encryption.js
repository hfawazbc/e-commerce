const crypto = require('crypto');

module.exports.generatePassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return { salt, hash };
}

module.exports.validatePassword = (password, db_hash, db_salt) => {
    const hash = crypto.pbkdf2Sync(password, db_salt, 10000, 64, 'sha512').toString('hex');
    
    return db_hash === hash;
}