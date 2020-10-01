const express= require('express')
const route= express.Router()
const Developer= require('./../controllers/developers.controller')

route.get('/listarTodas', Developer.buscarTodasAsDevelopers)
route.get('/listarUma/:nomeDeveloper', Developer.bucarUmaDeveloperPeloNome)
route.post('/criar', Developer.criarUmaDeveloper)
route.put('/atualizarUma/:nome', Developer.atualizarUmaDeveloper)
route.delete('/apagarUma/:nome', Developer.apagarUmaDeveloper)
route.get('/validarNomeDeveloper', Developer.validarNomeDeveloper)
module.exports= route