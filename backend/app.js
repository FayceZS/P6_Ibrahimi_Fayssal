const express = require('express');           //On utilise express pour faciliter la création de l'API
const mongoose = require('mongoose');         //On utilise mongoose pour gérer notre db mongo
const app = express();                              //On lance notre application express
const sauceRoutes = require('./routes/sauce');      //On définie nos routes
const bodyParser = require('body-parser');          //On va utiliser bodyParser pour parser les requêtes json et s'en servir directement comme des objets javascript
const userRoutes = require('./routes/user');
const path = require('path');                     //On utilise le module path pour gérer nos fichiers en l'occurence nos images


mongoose.connect('mongodb+srv://Fayce:pl820827@cluster0-flqzl.mongodb.net/test?retryWrites=true&w=majority',            //On connecte notre application à notre base de données
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {                                                         //On définie nos CORS pour donner l'accès du backend au frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/image', express.static(path.join(__dirname,'images')));         //On rend l'application statique pour gérer les images
app.use(bodyParser.json());                                               //On parse les requêtes JSON pour les utiliser comme des objets javascript
app.use('/api/sauces', sauceRoutes);                                    //On dirige les requêtes vers les routes appropriées
app.use('/api/auth',userRoutes);


module.exports = app;                                                 //On exporte l'app pour s'en servir ailleurs