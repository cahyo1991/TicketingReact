require('dotenv').config()


module.exports = {
    SqlConfig: {
        server: '10.60.1.6',
        authentication: {
            type: 'default',
            options: {
                userName: 'UserApplication',
                password:'k4muG4nt3ng'
            }
        },
        options: {
            database: 'ITManagement',
            encrypt: true,
            trustServerCertificate: true
        }
    }
}