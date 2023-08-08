const express = require('express')
const app = express()

// INFORMAR QUE O FORMATO UTILIZADO SERÁ JSON
app.use(express.json())

// CRIAÇÃO DE UMA ROTA PARA RETONAR UMA MENSAGEM
app.get('/', function (req, res) {
    res.json({ message: 'Hello API Helper' })
})

// CRIAÇÃO DE UMA ROTA PARA RECEBER UM CORPO JSON E RETORNAR NA RESPOSTA
app.post('/students', function (req, res) {
    const student = req.body
    res.json(student)
})

app.listen(5000)