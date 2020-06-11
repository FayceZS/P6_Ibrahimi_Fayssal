const bCrypt = require('bcrypt');                           //On va utiliser bcrypt pour crypter le mot de passe de l'utilisateur
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req,res,next) => {
    bCrypt.hash(req.body.password, 10)                          //Grâce à bcrypt on crypte 10 fois le mot de passe de l'utilisateur avant de l'envoyer à la base de données
    .then(
        hash => {
            const user = new User({
                email : req.body.email.toLowerCase(),
                password : hash
            });
            user.save()
            .then(()=> res.status(201).json({message : "utilisateur crée"}))
            .catch(error => res.status(500).json({error}));
        }
    )
    .catch(error => res.status(500).json({error}));

};

exports.login = (req,res,next) => {
        User.findOne({email:req.body.email.toLowerCase()})                                                    //On récupère l'user qui veut se logger
        .then(user =>{
            if(!user){
                return res.status(401).json({error : "Utilisateur non trouvé"});
            }
            bCrypt.compare(req.body.password, user.password)                                    //bcrypt compare la chaine de caractère renvoyée par l'utilisateur à celle qu'il a crypté
            .then(valid => {
                if(!valid){                                                                         
                    return res.status(401).json({error : "Mot de passe incorrect"});
                }
                res.status(200).json({
                    userId : user._id,
                    token : jwt.sign(
                        {userId : user._id},
                        //'$2b$10$WZrlJ3lvO4jURC4dUM8b5uE7ZiBMoD3rhdHzd9HUm3/gTpVEEFLzO',
                        '$2b$10$WZrlJ3lvO4jURC4dUM8b5uE7ZiBMoD3rhdHzd9HUm3/gTpVEEFLzO',
                        {expiresIn : '24h'}
                    )
                });
            }

                )
            .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({error}));
};