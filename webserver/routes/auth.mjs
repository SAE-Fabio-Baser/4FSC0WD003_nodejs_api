import jwt from 'jsonwebtoken'

export default function (server, db) {
  server.post('/auth/login', async (req, res) => {
    const payload = {
      email: 'moin',
      username: 'moinser',
      // exp: Math.round(Date.now() / 1000 + 60 * 3),
      exp: Date.now() / 1000,
    }
    const token = jwt.sign(payload, 'geheim')

    res.send({
      token,
    })
  })
}
