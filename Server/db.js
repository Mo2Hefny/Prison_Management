import mysql from "mysql"
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'zizo23!',
    database:'prisonerdatabase'
})
export default db;