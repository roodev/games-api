const developer= require('../models/developers.model')


class Developer{

    buscarTodasAsDevelopers(req, res){
        developer.find({}, {games: 0})
        
        .sort({nome: 1})
        .exec((err, data) => {
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            } else {
                if(data.lenght <= 0){
                    res.status(200).send({message: "Não foram encontradas Desenvolvedoras para exibir"})
                } else{
                    res.status(200).send({message: "Desenvolvedoras recuperadas com sucesso", data: data })
                }
            }
        })
    }

    bucarUmaDeveloperPeloNome (req, res){
        const {nomeDeveloper} = req.params

        if(nomeDeveloper == undefined || nomeDeveloper =='null'){
            res.status(400).send({message: "O nome da desenvolvedora deve ser obrigatoriamente preenchido"})
        }

        developer.find({nome: nomeDeveloper })
            .populate('games', {nome: 1, imagem: 1})
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
                } else {
                    if (data.lenght <= null){
                         res.status(200).send({message: `A desenvolvedora ${nomeDeveloper} não existe no banco de dados`})
                    }else{
                        res.status(200).send({message: `A desenvolvedora ${nomeDeveloper} foi recuperada com sucesso`, data: data})
                    }
                }
            })       
        
    }
    

    criarUmaDeveloper(req, res){
        const reqBody= req.body

        developer.create(reqBody, (err, data) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            } else{
                res.status(201).send({message: "Desenvolvedora criada com sucesso no banco de dados", data: data})
            }
        }) 
    }

   

    visualizarUmaDeveloper(req, res){
        const nome= req.params.nome

        developer.find({nome: nome}, (err, data) =>{
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            }else{
                res.status(200).send({message: `A desenvolvedora ${nome} foi recuperada com sucesso`, developer: data})
            }       
        })
    }

    atualizarUmaDeveloper(req, res){
        const nome= req.params.nome

        developer.updateOne({nome: nome}, {$set: req.body}, (err, data) =>{
            if (err) {
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
            } else{
                res.status(200).send({message: `A desenvolvedora ${nome} foi atualizada com sucesso`, update: data})
            }
        })
    }

    apagarUmaDeveloper(req, res){
        const nomeDaDeveloperParaSerApagado= req.params.nome

        developer.deleteOne({nome: nomeDaDeveloperParaSerApagado}, (err) => {
            if (err){
                res.status(500).send({message: "Houve um erro ao apagar um", error: err})
            } else{
                res.status(200).send({message: `A desenvolvedora  ${nomeDaDeveloperParaSerApagado} foi apagada com sucesso`})
            }
        })
    }

    validarNomeDeveloper(req, res){
        const nome= req.query.nome.replace(/%20/g, " ")

        developer.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, (err, result) =>{
            if(err){
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
            }else{
                if(result.lenght > 0){
                    res.status(200).send({ message: "Já existe uma desenvolvedora cadastrada com esse nome", data: result.lenght })
                }else{
                    res.status(200).send({message: "Desenvolvedora disponível", data: result.lenght })
                }
            }
        })
    }
    
}
module.exports = new Developer()