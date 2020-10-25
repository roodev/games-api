const express= require('express')
const route= express.Router()
const Game= require('./../controllers/games.controller')

route.post('/criar', Game.criarUmGame)
route.get('/listarTodos', Game.buscarTodosOsGames)
route.get('/listarUm/:nomeGame', Game.buscarUmGamePeloNome)
route.put('/atualizarUm/:nome', Game.atualizarUmGame)
//route.delete('/apagarUm/:nome', Game.apagarUmGame)
route.get('/validarNomeGame', Game.validarNomeGame)
route.put('/atualizar/:gameId', Game.update)
route.delete('/apagar/:gameId', Game.delete)

module.exports= route