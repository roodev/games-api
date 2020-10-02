const {Schema, model} = require("mongoose")

const DeveloperSchema= new Schema({
    nome:{
        type: String,
        required: true,
        maxlenght: 200,
        trim: true
    },

    imagem:{
        type: String,
        required: true,
        trim: true
    },

    nacionalidade:{
        type: String,
        required: true,
        trim: true
    },

     plataforma:{
        type: String,
        required: true,
        trim: true
    },

    games:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Game'
            
        }
    ]
},

    {
        timestamps: true,
        versionKey: false
    }

)

module.exports= model('Developer', DeveloperSchema)
