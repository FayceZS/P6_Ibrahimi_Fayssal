const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');          //on utilise le plugin mongoose unique validator pour s'assurer que la base de données ne contiendra pas plusieurs fois le même email

const userSchema = mongoose.Schema({
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);