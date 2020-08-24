const express= require('express')
const route= express.Router()
const Gamer= require('./../controllers/gamers.controller')

route.post('/criar', Gamer.criarGamer)
route.get('/visualizarTodos', Gamer.visualizarGamers)
route.get('/visualizarUm/:nome', Gamer.visualizarUmGamer)
route.put('/atualizarUm/:nome', Gamer.atualizarUmGamer)
route.delete('/apagarUm/:nome', Gamer.apagarUmGamer)

module.exports= route