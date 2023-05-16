import express from "express";
import chalk from "chalk";
import { MongoClient } from "mongodb";

import usersRoutes from "./routes/users.mjs";
import postsRoutes from "./routes/posts.mjs";

const server = express();
server.use(express.json());

const dbClient = new MongoClient(
  "mongodb+srv://admin:admin@datenbank1.ozyag9i.mongodb.net/"
);
await dbClient.connect();
const db = dbClient.db("webapp");

usersRoutes(server);
postsRoutes(server);

async function testDB() {
  const collection = db.collection("users");
  const users = await collection.find({}).toArray();
  console.log(users);
}

server.listen(3000, () => {
  console.log(chalk.green("Server is now running on port 3000"));

  testDB();
});
