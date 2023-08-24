console.log('week10')
import mysql from 'mysql2/promise';
import "./loadenv.js";

const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

//create connection

const pool = mysql.createPool({
    host: MYSQL_HOST,   
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
})

const connectMysql = async () =>{
    try {
        console.log('>>> connecting to mysql')
        const connection = await pool.getConnection();

        console.log('>>> create new database');
        await connection.query(`
            CREATE DATABASE IF NOT EXISTS howmuch_app
        `)

        console.log('>>> switching to new database: howmuch_app');
        await connection.query(`
            USE howmuch_app
        `)

        console.log('>>> creating table users')
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL)
        `)

        console.log('>>> creating table transactions')
        await connection.query(`
            CREATE TABLE IF NOT EXISTS transactions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            type VARCHAR(255) NOT NULL,
            amount DOUBLE(10, 0) NOT NULL)
        `)

        console.log('>>> show databases')
        const [databases] = await connection.query(`
                SHOW DATABASES
        `)
        console.log('>>> list databases')
        databases.map((db:any) => console.log("database", db));

        console.log('>>> show table users')
        const [users_table] = await connection.query(`
                SELECT * FROM users
        `)
        console.log('>>> list databases')
        users_table.map((row:any) => console.log("database", row));
        
    } catch (err) {
        console.log(err)
    }
}

connectMysql();