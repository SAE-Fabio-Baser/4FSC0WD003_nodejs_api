import express from 'express'
import chalk from 'chalk'
import { MongoClient } from 'mongodb'

import usersRoutes from './routes/users.mjs'
import postsRoutes from './routes/posts.mjs'
import authRoutes from './routes/auth.mjs'

const server = express()
server.use(express.json())

const dbClient = new MongoClient(
  'mongodb+srv://admin:admin@datenbank1.ozyag9i.mongodb.net/'
)
await dbClient.connect()
const db = dbClient.db('webapp')

usersRoutes(server, db)
postsRoutes(server, db)
authRoutes(server, db)

server.listen(3000, () => {
  console.log(chalk.green('Server is now running on port 3000'))
})
