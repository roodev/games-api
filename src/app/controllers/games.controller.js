const game= require('./../models/games.model')
const developer= require('./../models/developers.model')
const gamesModel = require('./../models/games.model')


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

    /*apagarUmGame(req, res){
        const nomeDoGameParaSerApagado= req.params.nome

        game.deleteOne({nome: nomeDoGameParaSerApagado}, (err) => {
            if (err){
                res.status(500).send({message: "Houve um erro ao apagar um", error: err})
            } else{
                res.status(200).send({message: `O Game  ${nomeDoGameParaSerApagado} foi apagado com sucesso`})
            }
        })
    }
*/
    validarNomeGame(req, res){
        const nome= req.query.nome.replace(/%20/g, " ")

        game.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, (err, result) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição" })
            }else{
                if(result.length > 0){
                    res.status(200).send({ message: "Já existe um game cadastrado com esse nome", data: result.length })
                }else{
                    res.status(200).send({message: "Game disponível", data: result.length })
                }
            }
        })
    }

    update(req, res){
        const{gameId} = req.params
        const{reqBody}= req.body
        const developerId= reqBody['developer']

        game.updateOne({_id: gameId}, {$set: reqBody}, (err, games) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição" })
            } else{
                 developer.findOne({games: gameId}, (err, result) => {
                     if (err){
                        res.status(500).send({message: "Houve um erro ao processar a sua requisição" })
                     }else {
                         if(result['_id'] == developerId) {
                             res.status(200).send({ message: "O Game foi atualizado", data: games })
                         }else{
                             result.games.pull(gameId)
                             result.save({}, (err) => {
                                 if(err){
                                    res.status(500).send({message: "Houve um erro ao processar a sua requisição" })                                                                        
                                 }else{
                                     developer.findById(developerId, (err, developer) => {
                                         if (err) {
                                            res.status(500).send({message: "Houve um erro ao processar a sua requisição" })
                                         } else {
                                             developer.games.push(gameId)
                                             developer.save({}, (err) =>{
                                                 if (err) {
                                                    res.status(500).send({message: "Houve um erro ao processar a sua requisição" })
                                                 } else {
                                                     res.status(200).send({ message: "O Game foi atualizado", data: games})
                                                 }
                                             })
                                         }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    }   
    
    delete(req, res){
        const { gameId }= req.params

        developer.findOne({ games: gameId }, (err, developer) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
            } else {
                developer.games.pull(gameId)
                developer.save( (err) => {
                    if (err) {
                        res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                    } else {
                        game.deleteOne({ _id: gameId }, (err, result) => {
                            if (err) {
                                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                            } else {
                                res.status(200).send({ message: "Game foi apagado com sucesso", data: result})
                            }
                        })
                    }

                })
            }
        })
    }
                                                                    
                                 
}
module.exports = new Game()