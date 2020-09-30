const game= require('./../models/games.model')
const developer= require('./../models/developers.model')


class Game{

  

    buscarTodosOsGames(req, res){
        
        game.find({})
            .populate('developer', {nome: 1, imagem: 1})
            .sort({nome: 1})
            .exec((err, data) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            }else{
                if(data.lenght <= 0){
                    res.status(200).send({message: "Não existem games cadastrados no banco de dados"})
                }else {
                    res.status(200).send({message: "Todos os games foram recuperados com sucesso", data: data})
                }
                
            }
        })
    }

    buscarUmGamePeloNome(req, res){
        const {nomeGame}= req.params

        if(nomeGame == undefined || nomeGame =='null'){
            res.status(400).send({message:"O nome do game deve ser obrigatoriamente preenchido"})
        }

        game.findOne({nome: nomeGame})
            .populate('developer', {nome: 1, imagem: 1})
            .exec ((err, data) =>{
                if(err){
                    res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
                 }else{
                    if(data == null){
                        res.status(200).send({message:`Game não encontrado no banco de dados`})
                    }else{
                        res.status(200).send({message: `O Game ${nomeGame} foi recuperado com sucesso`, data: data})
                    }               
                }       
            })
    }

    criarUmGame(req, res) {
        const reqBody = req.body
        const idDeveloper = reqBody['developer']
    
    
        game.create(reqBody, (err, game) => {
          if (err) {
            res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
          } else {
            developer.findById(idDeveloper, (err, developer) => {
              if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
              } else {
                developer.games.push(game)
                developer.save({}, (err) => {
                  if (err) {
                    res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                  } else {
                    res.status(201).send({ message: "Game criado com sucesso", data: game})
                  }
                })
              }
            })
          }
        })
      }


    atualizarUmGame(req, res){
        const nome= req.params.nome

        game.updateOne({nome: nome}, {$set: req.body}, (err, data) =>{
            if (err) {
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            } else{
                res.status(200).send({message: `O Game ${nome} foi atualizado com sucesso`, update: data})
            }
        })
    }

    apagarUmGame(req, res){
        const nomeDoGameParaSerApagado= req.params.nome

        game.deleteOne({nome: nomeDoGameParaSerApagado}, (err) => {
            if (err){
                res.status(500).send({message: "Houve um erro ao apagar um", error: err})
            } else{
                res.status(200).send({message: `O Game  ${nomeDoGameParaSerApagado} foi apagado com sucesso`})
            }
        })
    }
    
}
module.exports = new Game()