var MongoClient = require("mongodb");
require("dotenv").config();
console.log(process.env.DB_URL);
var url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`; // "mongodb://localhost:27017";

var client = new MongoClient.MongoClient(url);

var dbName = process.env.DB_NAME;

var connectToDB = async () => {
  await client.connect();
  console.log(`Successfully Connected to ${url}`);
  var db = client.db(dbName);
  console.log(`Connected to ${dbName}`);
  return db;
};

var closeConnect = async () => {
  await client.close();
  console.log("Connection Closed");
};

module.exports = { connectToDB, closeConnect };
