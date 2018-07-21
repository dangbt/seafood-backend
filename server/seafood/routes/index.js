// const routes
const catchAllRoute = require('./catchAllRoute');

const userListRoute = require('./User/listRoute');
const userPostRoute = require('./User/postRoute');
//module.export routes
module.exports = [
    catchAllRoute,
    
    userListRoute,
    userPostRoute
]