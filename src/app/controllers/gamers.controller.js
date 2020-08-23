const gamerschema= require('../models/gamers.model')

function definirCamposDeBusca(campos){
    if(campos == 'nome18'){
        return{ nome: 1, plataforma: 1}
    } else if(campos == 'nome'){
        return {nome: 1}
    } else {
        return null
    }
}
class Gamer{

    criarGamer(req, res){
        const body= req.body

        gamerschema.create(body, (err, data) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            } else{
                res.status(201).send({message: "Gamer criado com sucesso no banco de dados", gamer: data})
            }
        }) 
    }

    visualizarGamers(req, res){
        const campos= req.query.campos

        gamerschema.find({}, definirCamposDeBusca(campos), (err, data) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            }else{
                res.status(200).send({message: "Todos os gamers foram recuperados com sucesso", gamers: data})
            }
        })
    }

    visualizarUmGamer(req, res){
        const nome= req.params.nome

        gamerschema.find({nome: nome}, (err, data) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            }else{
                res.status(200).send({message: `O Gamer ${nome} foi recuperado com sucesso`, gamer: data})
            }       
        })
    }

    atualizarUmGamer(req, res){
        const nome= req.params.nome

        gamerschema.updateOne({nome: nome}, {$set: req.body}, (err, data) =>{
            if (err) {
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            } else{
                res.status(200).send({message: `O Gamer ${nome} foi atualizado com sucesso`, update: data})
            }
        })
    }

    apagarUmGamer(req, res){
        const nomeDoGamerParaSerApagado= req.params.nome

        gamerschema.deleteOne({nome: nomeDoGamerParaSerApagado}, (err) => {
            if (err){
                res.status(500).send({message: "Houve um erro ao apagar um", error: err})
            } else{
                res.status(200).send({message: `O Gamer  ${nomeDoGamerParaSerApagado} foi apagado com sucesso`})
            }
        })
    }
    
}
module.exports = new Gamer()