const sql = require('mssql');
const SqlConfig = require('../src/Config').SqlConfig

exports.MainConnection = async () => {
    try {
        const Connection = await sql.connect(SqlConfig)
        const request = new sql.Request(Connection)

        return request
    }
    catch (err) {
        console.log("🚀 ~ file: Connection.js ~ line 12 ~ exports.MainConnection=async ~ err", err)

    }
}