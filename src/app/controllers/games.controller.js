const gameschema= require('./../games.model')

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
}
module.exports = new Game()