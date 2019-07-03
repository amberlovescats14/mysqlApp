const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.json())
//create db
//create connection

const db = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'CameronJ2006!',
  database: 'july3'
})

db.getConnection((err)=> {
  if(err) return console.log(err.message)
  console.log(`MySQL Connected`)
})
app.get('/createDB', (req, res) => {
  let sql = `CREATE DATABASE july3`;
  db.query(sql, (err, result)=> {
    if(err) return console.log(err.message);
    res.send(`Database Created.`)
    console.log(result)
  })
})
////!lets say this is a blog
//create table
app.get('/createTable', (req, res)=> {
  let sql = `CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`
  db.query(sql,(err, result)=> {
    if(err) return console.log(err.message);
    console.log(result)
    res.send(`Table Created...`)
  })
})
//insert post 1
app.get('/addPost1', (req, res)=> {
  let post = {
    title: `Post one`,
    body: `THIS IS POST NUMBER ONE`
  }
  let sql = `INSERT INTO posts SET ?`
  let query = db.query(sql, post, (err, result)=> {
    if(err) return console.log(err.message)
    console.log(result)
    res.send(`Post 1 Created`)
  })
})

app.get('/getPosts', (req, res) => {
  let sql = `SELECT * FROM posts`
  let query = db.query(sql, (err, result)=> {
    if(err) return console.log(err.message);
    console.log(result)
    res.send(`Post Fetched.....`)
  })
})
// single post
app.get('/getPost/:id', (req, res) => {
  let sql = `SELECT * from posts WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if(err) return console.log(err.message);
    console.log(result)
    res.send(`Post number ${req.params.id} fetched...`)
  })
})
//update post
app.get('/updatePost/:id', (req, res)=> {
  let newTitle = `Updated Title`
  let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result)=> {
    if(err) return console.log(err.message);
    console.log(result)
    res.send(`Title updated.`)
  })
})
// Delete Post
app.get('/deletePost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result)=> {
    if(err) return console.log(err.message);
    console.log(result);
    res.send(`Post ${req.params.id} Deleted`)
  })
})
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log(`Server Started on prort: ${PORT}`))