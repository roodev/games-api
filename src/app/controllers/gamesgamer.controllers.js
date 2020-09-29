const gameSchema = require('./../models/games.model')
const gamerSchema = require('./../models/gamers.model')

class gameGamer {

    async novogameGamer (req, res) {

        const { gamerId } = req.params
        const novoGame = gameSchema(req.body)
        const gamer = await gamerSchema.findById(gamerId)
        await novoGame.save()
        gamer.game.push(novoGame)
        await gamer.save()

        res.status(200).send({ message: `Game criado com sucesso ${novoGame.nome} com o Gamer ${gamer.nome}`}).json(novoGame)
    }   

    async pegargameGamer(req, res) {
        const { gamerId } = req.params
        const gamer = await gamerSchema.findById(gamerId).populate('games')
        res.status(200).json(gamer)
    }
}
module.exports = new gameGamer() 