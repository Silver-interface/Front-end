import { MongoClient } from "mongodb";


// //crear url
// // URI to connect to the mongo service.
// const  uri = process.env.MONGODB_URI;

// // Database name.
// const  db_name = process.env.MONGODB_DB_NAME;

// const  options = {};

// // Check the URI exists.
// if (!process.env.MONGODB_URI) {
//   throw  new  Error('Please add your Mongo URI to .env.local');
// }

// // Instance the Mongo client.
// const  client = new  MongoClient(uri, options);

// // Connect to the mongo client.
// const  connected = await  client.connect();
// // Connect to the database.

// const  connectToDatabase =