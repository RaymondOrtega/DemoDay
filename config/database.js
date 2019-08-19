
module.exports = {
    'url' : `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@books-3bd2v.mongodb.net/${process.env.USER_TEST}?retryWrites=true&w=majority`,
    'dbName': process.env.DB_NAME
};
