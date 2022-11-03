import { User } from '../config/db.js'
import { comparePass, success, generateJWT } from '../helpers/helper.js'

export const login = async (app) => {
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body

    User.findOne({
      where: { username }
    }) 
    .then(user => {
      if(!user) {
        return res.status(404).json(success("No user exists", {}))
      }

      comparePass(password, user.password)
        .then(matchedPass => {
          if(!matchedPass) {
            return res.status(401).json(success("Password incorrect", {}))
          }

          return res.json({ message: "LOGIN User success", user, token: generateJWT({ userId: user.id }) })
        })
    })
    .catch(err => {
      return res.json(success("LOGIN User failed", err))
    })
  })
}
