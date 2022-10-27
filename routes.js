const { default: Server } = require('next/dist/server/base-server');

const routes = require('next-routes')(); //For Custom/dynamic routing


routes
.add('campaigns/new' , '/campaigns/new')
.add('/campaigns/:address', '/campaigns/show' ); //(route link , component to show)
//:address is variable also it deprecated /campaigns/new route as it thinks new is address variable

module.exports = routes;
