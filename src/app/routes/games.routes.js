const express= require('express')
const route= express.Router()
const Game= require('./../controllers/games.controller')

route.post('/criar', Game.criarGame)
route.get('/visualizarTodos', Game.visualizarGames)
route.get('/visualizarUm/:nome', Game.visualizarUmGame)

module.exports= route