import express from "express";
import chalk from "chalk";

import usersRoutes from "./routes/users.mjs";
import postsRoutes from "./routes/posts.mjs";

const server = express();
server.use(express.json());

usersRoutes(server);
postsRoutes(server);

server.listen(3000, () => {
    console.log(chalk.green("Server is now running on port 3000"));
});
