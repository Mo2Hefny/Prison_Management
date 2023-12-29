import mysql from "mysql"
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'mo2374',
    database:'prisonerdatabase'
})
export default db;