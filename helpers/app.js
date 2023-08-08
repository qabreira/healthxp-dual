const express = require('express')
const app = express()

app.use(express.json())

const db = require('./db')

app.get('/', function (req, res) {
    res.json({ message: 'Hello API Helper' })
})

// REQUISITANDO ESTA ROTA UM ESTUDANTE É DELETADO (CASO EXISTIR)
// E RECRIADO PARA PREPARAR A PRÉ CONDIÇÃO DE TESTE :)
app.post('/students', db.deleteAndCreateStudent)

app.listen(5000)