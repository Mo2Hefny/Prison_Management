import mysql from "mysql"
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'$KarimGebril2002$',
    database:'prisondatabase'
})
export default db;