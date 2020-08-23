const gameschema= require('./../models/games.model')

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
        gameschema.find({}, (err, data) =>{
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
    
}
module.exports = new Game()