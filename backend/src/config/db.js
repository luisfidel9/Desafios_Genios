import mysql from 'mysql2/promise'


export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Ds5678sD@",
    database: "taskmanager",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})