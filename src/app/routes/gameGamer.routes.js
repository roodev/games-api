const express= require('express')
const route= express.Router()
const gameGamer= require('./../controllers/gamesgamer.controllers')

route.post('/criar/:gamerId', gameGamer.novogameGamer)
route.get('/visualizarTodos/:gamerId', gameGamer.pegargameGamer)


module.exports= route