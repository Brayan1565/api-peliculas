const mysql = require('mysql2/promise')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const probarConexion = async () => {
    try {
        const conexion = await pool.getConnection()
        console.log('Conectado a la DB')
        conexion.release()
    } catch (error) {
        console.error('Error al conectar a la DB:', error.message)
    }
}

module.exports = {
    pool,
    probarConexion
}