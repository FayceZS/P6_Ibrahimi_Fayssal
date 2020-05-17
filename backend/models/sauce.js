const mongoose = require('mongoose');

const sauceSchema = new mongoose.Schema(                    //On crée le schéma correspondant aux sauces envoyées par le frontend
    {
      
      userId : {type : String,required : true},
      name: {type : String, required : true},
      manufacturer: {type : String, required : true},
      description: {type : String, required : true},
      mainPepper: {type : String, required : true},
      imageUrl: {type : String, required : false},
      heat: {type : Number, required : true},
      likes: {type: Number,default: 0,},
      dislikes: {type: Number,default: 0,},
      usersLiked: {type: [String],default: [],},
      usersDisliked: {type: [String],default: [],}
    
    //   heatValue: {type : Number, required : true},
    }
)

module.exports = mongoose.model('sauce',sauceSchema)  //On exporte le schéma pour l'utiliser plus tard