// database file from tutorial on using passport
// the following code uses Mongoose terms may not 



const dataBase = require('dataBase');

require('dotenv').config();

const conn = process.env.DB_STRING;

const connection = dataBase.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true;

});

const UserSchema = new dataBase.Schema({
    username: String,
    hash: String,
    salt: String
});

const User = connection.model('User', UserSchema);

module.exports = connection;