const mysql = require('mysql')
const express = require('express')
// const path = require('path')
const bodyParser= require('body-parser')
const app = express()

const swal =require ('sweetalert');
app.use(bodyParser.urlencoded({ extended: true }));

const conection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'smartrash'
})

app.use(express.static('public'))
app.set('view engine' , 'pug')

app.post("/home" , (req,res) =>{
   
    conection.connect(function (err){
    let user = req.body.username
    let pass = req.body.password
    conection.query(`SELECT * FROM users WHERE username = '${user}'`, function (err ,result , fields){
      if(err) throw err;
      let DB_USERNAME = result[0].username;
      let DB_PASS = result[0].password;
      user == DB_USERNAME && pass== DB_PASS ?
       res.render('home',{user : `Hello ${user} 🖐✌✌ `}) : res.render('index'); 
    })
             
   })
})

app.get('/' ,function (req,res) {
   res.render('index', {title: 'Smartrash | Login', MainTitle: 'Login'})
})

app.get('/home', function (req,res){

})


app.listen(3500)