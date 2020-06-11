
const http = require('http');           //On importe le package natif http de node
const app = require('./app');           //On appelle notre application via le server

const normalizePort = val => {              //Fonction qui vise à renvoyer un port valide peu importe la manière dont il sera fourni
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false; 
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);                              //On paramètre le port de l'app

const errorHandler = error => {                 //Fonction callback erreur
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);