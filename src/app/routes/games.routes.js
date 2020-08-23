const express= require('express')
const route= express.Router()
const Game= require('./../controllers/games.controller')

route.post('/criar', Game.criarGame)

module.exports= route