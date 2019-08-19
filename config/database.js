// config/database.js
// module.exports = {
//
//     'url' : 'mongodb+srv://raymond:raymond@books-3bd2v.mongodb.net/test?retryWrites=true&w=majority', // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
//     'dbName': 'WorldOfBooks'
// };
module.exports = {
    'url' : `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@books-3bd2v.mongodb.net/${process.env.USER_TEST}?retryWrites=true&w=majority`,
    'dbName': process.env.DB_NAME
};
