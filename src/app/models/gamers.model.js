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

    game:[{
        type: Schema.Types.ObjectId,
        ref: 'gameschema' 
    }],

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
