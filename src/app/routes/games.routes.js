const express= require('express')
const route= express.Router()
const Game= require('./../controllers/games.controller')

route.post('/criar', Game.criarGame)
route.get('/visualizarTodos', Game.visualizarGames)
route.get('/visualizarUm/:nome', Game.visualizarUmGame)
route.put('/atualizarUm/:nome', Game.atualizarUmGame)
route.delete('/apagarUm/:nome', Game.apagarUmGame)

module.exports= route