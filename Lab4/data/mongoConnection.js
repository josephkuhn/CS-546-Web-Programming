const MongoClient = require("mongodb").MongoClient;
let _connection = undefined;

let connectDb = () => {
  if (!_connection) {
    _connection = MongoClient.connect("mongodb://localhost:27017").then(
      client => {
        return client.db("animals");
      }
    );
  }
  return _connection;
};

module.exports = connectDb;