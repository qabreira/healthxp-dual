const express = require('express')
const app = express()

app.use(express.json())

const db = require('./db')

app.get('/', function (req, res) {
    res.json({ message: 'Hello API Helper' })
})

app.post('/students', db.deleteAndCreateStudent)
app.delete('/students/:email', db.deleteStudentByEmail)
app.post('/enrolls', db.insertEnrollByEmail)

app.listen(5000)