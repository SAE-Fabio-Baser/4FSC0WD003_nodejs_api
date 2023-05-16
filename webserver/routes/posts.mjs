import { ObjectId } from 'mongodb'
import { faker } from '@faker-js/faker'
import jwt from 'jsonwebtoken'

export default function (server, db) {
  const coll = db.collection('posts')

  // READ
  server.get('/posts', async (req, res) => {
    const { page = 1, size = 10 } = req.query
    const totalPostsCount = await coll.find({}).count()
    const posts = await coll
      .find({})
      .limit(Number(size))
      .skip((page - 1) * size)
      .toArray()

    res.send({
      total: totalPostsCount,
      pageSize: size,
      page,
      posts: posts,
    })
  })

  // CREATE
  server.post('/posts', async (req, res) => {
    const { title, summary, folder } = req.body
    const newPost = { title, summary, folder }

    const createdPost = await coll.insertOne(newPost)

    res.send(createdPost)
  })

  // UPDATE
  server.put('/posts/:id', async (req, res) => {
    const { id } = req.params
    const { token } = req.query

    if (!token) {
      res.sendStatus(401)
      return
    }

    let valididateToken
    try {
      valididateToken = jwt.verify(token, 'geheim')
    } catch (error) {
      res.sendStatus(401)
      return
    }

    if (valididateToken.exp < Date.now() / 1000) {
      res.sendStatus(403)
      return
    }

    console.log(valididateToken)
    const { title, summary, folder, content } = req.body

    const updatedPost = await coll.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, summary, folder, content } }
    )

    res.send(updatedPost)
  })

  // DELETE
  server.delete('/posts/:id', async (req, res) => {
    const { id } = req.params

    const post = await coll.deleteOne({ _id: new ObjectId(id) })

    res.send(post)
  })

  server.post('/post/generate', async (req, res) => {
    const { count = 10 } = req.query

    for (let i = 0; i < count; i++) {
      coll.insertOne({
        title: faker.lorem.sentence(3),
        summary: faker.lorem.paragraph(1),
        content: faker.lorem.paragraphs(3),
      })
    }

    res.sendStatus(200)
  })
}
