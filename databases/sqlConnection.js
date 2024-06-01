import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

console.log('hello',process.env.DB_PASSWORD)
const sqlConnection = mysql.createConnection({
    /*dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "rootpassword",
    database: "migrationdbsql",*/
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: "mysql",
})

export default sqlConnection;