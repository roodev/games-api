const {Schema, model} = require("mongoose")

const GamerSchema= new Schema({
    nome:{
        type: String,
        required: true,
        trim: true
    },

    idade:{
        type: Number,
        required: true,
        trim: true
    },

    game:{
        type: String,
        required: true,
        trim: true
    },

    plataforma:{
        type: String,
        required: true,
        trim: true
    }
},

    {
        timestamps: true,
        versionKey: false
    }

)

module.exports= model('gamerschema', GamerSchema)
