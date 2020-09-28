const express= require('express')
const route= express.Router()
const Developer= require('./../controllers/developers.controller')

route.post('/listarTodas', Developer.buscarTodasAsDevelopers)
route.get('/listarUma/: nomeDeveloper', Developer.bucarUmaDeveloperPeloNome)
route.post('/criar', Developer.criarUmaDeveloper)
route.get('/visualizarUma/:nome', Developer.visualizarUmaDeveloper)
route.put('/atualizarUma/:nome', Developer.atualizarUmaDeveloper)
route.delete('/apagarUma/:nome', Developer.apagarUmaDeveloper)

module.exports= route