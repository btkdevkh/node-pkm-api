import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if(!authorizationHeader) {
    return res.status(401).json({ message: 'Not authorize, no token !' })
  }

  const token = authorizationHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, 'bella123', (err, decodedToken) => {
    if(err) {
      return res.status(401).json({ message: 'Not authorize, token is not valid', data: err })
    }

    const userId = decodedToken.userId
    if(req.body.userId && req.body.userId !== userId) {
      res.status(401).json({ message: 'User id is not valid' })
    } else {
      next()
    }
  })
}
