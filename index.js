/**Importando dependências para rodar API Games*/
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const database= require('./src/config/database')

/**Configurando body parser*/
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/json'}))

app.use(cors())

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', "*")
    res.header("Acess-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

/**Configurando o endpoint para responder o JSON com uma mensagem*/
app.get('/', (req, res) => {
    res.send({message: `API Games ouvindo na porta   ${PORT}`})
})

/**Iniciando o servidor da API Games na porta configurada na variável de ambiente (process.env) ou 3000 */
app.listen(PORT, () => console.log(`API Games ouvindo na porta ${PORT}`))

