import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default function (server, db) {
  const usersCollection = db.collection('users')

  server.post('/auth/register', async (req, res) => {
    const { username, email, password } = req.body

    const usernameExist = await usersCollection.countDocuments({ username })

    if (usernameExist) {
      res.send({
        success: false,
        code: 'usernameExists',
        message: 'Username already exists',
      })
      return
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const createdUser = await usersCollection.insertOne({
        username,
        email,
        password: hashedPassword,
      })

      res.send({
        success: true,
        code: 'userCreated',
        message: 'User created successfully',
        data: {
          username,
          userId: createdUser.insertedId,
        },
      })
    }
  })

  server.post('/auth/login', async (req, res) => {
    const { username, password } = req.body

    const user = await usersCollection.findOne({ username })
    const { password: dbPassword, ...restUser } = user

    const correctPassword = bcrypt.compareSync(password, dbPassword)

    if (!correctPassword) {
      res.send({
        success: false,
        code: 'invalidCredentials',
        message: 'Username or password is incorrect',
      })
      return
    } else {
      const payload = {
        ...restUser,
        exp: Math.round(Date.now() / 1000 + 60 * 3),
      }
      const token = jwt.sign(payload, 'geheim')

      res.send({
        success: true,
        token,
      })
    }
  })
}
