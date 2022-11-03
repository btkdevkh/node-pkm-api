import { UniqueConstraintError, ValidationError } from "sequelize"
import { Pokemon } from "../config/db.js"
import { success } from "../helpers/helper.js"
import { auth } from '../middlewares/auth.js'

export const updatePokemon = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const { id } = req.params
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id)
        .then(pokemon => {
          res.json(success("UPDATE Pokemon", pokemon))
        })
    })
    .catch(err => {
      if(err instanceof ValidationError) {
        return res.status(400).json({ message: err.message, data: err })
      }
      if(err instanceof UniqueConstraintError) {
        return res.status(400).json({ message: err.message, data: err })
      }
      res.status(500).json({ message: "Can not UPDATE pokemons", data: err })
    })
  })
}
