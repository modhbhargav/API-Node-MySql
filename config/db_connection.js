const mysql = require('mysql');

module.exports = {
    getConnection: () => {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'fabzcoder',
        })
    }
}