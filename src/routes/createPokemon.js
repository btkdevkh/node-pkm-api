import { UniqueConstraintError, ValidationError } from "sequelize"
import { Pokemon } from "../config/db.js"
import { success } from "../helpers/helper.js"
import { auth } from '../middlewares/auth.js'

export const createPokemon = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {
    Pokemon.create(req.body) 
      .then(pokemon => {
        res.json(success("CREATE Pokemon", pokemon))
      })
      .catch(err => {
        if(err instanceof ValidationError) {
          return res.status(400).json({ message: err.message, data: err })
        }
        if(err instanceof UniqueConstraintError) {
          return res.status(400).json({ message: err.message, data: err })
        }
        res.status(500).json({ message: "Can not CREATE pokemons", data: err })
      })
  })
}
