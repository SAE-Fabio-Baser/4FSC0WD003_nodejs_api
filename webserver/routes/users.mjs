export default function (server, db) {
  const collection = db.collection('users')

  // READ get all users
  server.get('/users', async (_req, res) => {
    const users = await collection.find({}).toArray()
    res.send(users)
  })
}
