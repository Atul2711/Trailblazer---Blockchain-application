
const routes = require('next-routes')(); //For Custom/dynamic routing

routes
.add('campaigns/new' , '/campaigns/new')
.add('/campaigns/:address', '/campaigns/show' )
.add('/campaigns/:address/requests','/campaigns/requests/index')
.add('/campaigns/:address/requests/new' , '/campaigns/requests/new');
//(route link , component to show)
//:address is variable also it deprecated /campaigns/new route as it thinks new is address variable
module.exports = routes;
