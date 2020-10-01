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

    sinopse:{
        type: String,
        required: true,
        trim: true
    },

    imagem: {
        type: String,
        required: true,
        trim: true
    },

    developer:{
        type: Schema.Types.ObjectId,
        ref: 'Developer',  
        required: true
        
    }

},

    {
        timestamps: true,
        versionKey: false
    }

)

module.exports= model('Game', GameSchema)