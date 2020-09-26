const{Schema, model} = require('mongoose')

const GameSchema= new Schema({
    nome:{
        type: String,
        required: true,
        trim: true
    },


    plataforma:{
        type: String,
        required: true,
        trim: true
    },

    classificacao:{
        type: Number,
        trim: true
    },

    imagem: {
        type: String,
        required: true,
        trim: true
    },

    produtora:{
        type: Schema.Types.ObjectId,
        ref: 'Developer',
        required: true,
        trim: true
    }

},

    {
        timestamps: true,
        versionKey: false
    }

)

module.exports= model('Game', GameSchema)