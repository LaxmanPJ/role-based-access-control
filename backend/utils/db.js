import mysql from 'mysql2'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employeems"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})

export default con;

