import { Pokemon } from "../config/db.js"
import { success } from "../helpers/helper.js"

export const findPokemonByPk = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    const { id } = req.params
    Pokemon.findByPk(id)
      .then(pokemon => {
        res.json(success("READ pokemon", pokemon))
      })
      .catch(err => res.status(500).json({ message: "Can not READ pokemon", data: err }))
  })
}
