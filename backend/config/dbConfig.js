const { MongoClient } = require("mongodb");

const url = process.env.DB_PORT; // "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = process.env.DB_NAME;

const main = async () => {
  await client.connect();
  console.log(`Successfully Connected to ${url}`);
  const db = client.db(dbName);
  console.log(`Connected to ${dbName}`);
  return db;
};

export default main;
