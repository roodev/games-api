const gameschema= require('./../models/games.model')

function definirCamposDeBusca(campos){
    if(campos == 'nome18'){
        return{ nome: 1, plataforma: 1}
    } else if(campos == 'nome'){
        return {nome: 1}
    } else {
        return null
    }
}
class Game{

    criarGame(req, res){
        const body= req.body

        gameschema.create(body, (err, data) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            } else{
                res.status(201).send({message: "Game criado com sucesso no banco de dados", game: data})
            }
        }) 
    }

    visualizarGames(req, res){
        const campos= req.query.campos

        gameschema.find({}, definirCamposDeBusca(campos), (err, data) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            }else{
                res.status(200).send({message: "Todos os games foram recuperados com sucesso", games: data})
            }
        })
    }

    visualizarUmGame(req, res){
        const nome= req.params.nome

        gameschema.find({nome: nome}, (err, data) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            }else{
                res.status(200).send({message: `O Game ${nome} foi recuperado com sucesso`, game: data})
            }       
        })
    }

    atualizarUmGame(req, res){
        const nome= req.params.nome

        gameschema.updateOne({nome: nome}, {$set: req.body}, (err, data) =>{
            if (err) {
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            } else{
                res.status(200).send({message: `O Game ${nome} foi atualizado com sucesso`, update: data})
            }
        })
    }

    apagarUmGame(req, res){
        const nomeDoGameParaSerApagado= req.params.nome

        gameschema.deleteOne({nome: nomeDoGameParaSerApagado}, (err) => {
            if (err){
                res.status(500).send({message: "Houve um erro ao apagar um", error: err})
            } else{
                res.status(200).send({message: `O Game  ${nomeDoGameParaSerApagado} foi apagado com sucesso`})
            }
        })
    }
    
}
module.exports = new Game()