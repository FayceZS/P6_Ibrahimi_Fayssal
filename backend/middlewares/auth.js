const jwt = require('jsonwebtoken');                    //On utilise le module jsonwebtoken pour s'assurer que l'utilisateur est bien celui qui est connecté

module.exports = (req,res,next) => {

    try{
        const token = req.headers.authorization.split(' ')[1];                  //On récupére le token attribué à l'utilisateur
        const decodedToken = jwt.verify(token, '$2b$10$WZrlJ3lvO4jURC4dUM8b5uE7ZiBMoD3rhdHzd9HUm3/gTpVEEFLzO');              //On le compare avec notre chaine de caractère de sécurité
        const userId = decodedToken.userId;

        if(req.body.userId && req.body.userId !== userId){                      
            throw 'User ID non valabble'
        }else{
            next();
        };

    }

    catch(error){
        res.status(401).json({error : error | 'Requête non authentifiée'});
    }
}