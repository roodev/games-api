const{Schema, model} = require('mongoose')

const GameSchema= new Schema({
    nome:{
        type: String,
        required: true,
        trim: true
    },

    produtora:{
        type: String,
        required: false,
        trim: true
    },

    plataforma:{
        type: String,
        required: true,
        trim: true
    },

    maior18:{
        type: Boolean,
        required: true,
        trim: true
    }

},

    {
        timestamps: true,
        versionKey: false
    }

)

module.exports= model('gameschema', GameSchema)