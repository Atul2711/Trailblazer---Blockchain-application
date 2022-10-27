const {CreateServer, createServer} = require('http');
const next = require('next');

//Instance of app on server 
const app =next({
    dev: process.env.NODE_ENV !== 'production'
});

//Navigation Logic
const routes = require('./routes');
const handler = routes.getRequestHandler(app);

//listen to specific port

app.prepare().then(()=>{
    createServer(handler).listen(3000,(err)=>{
        if(err) throw err;
        console.log('Ready on localhost:3000');
    });
});


// Server.js : Boots up next app and tell it to use routes.js