const http = require('http');

const server = http.createServer((req,res)=>{
    res.end(console.log('Réponse du serveur'));
    
})

server.listen(process.env.PORT || 3000);