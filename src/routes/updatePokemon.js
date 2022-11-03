import { Pokemon } from "../config/db.js"
import { success } from "../helpers/helper.js"

export const updatePokemon = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const { id } = req.params
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Pokemon.findByPk(id).then(pokemon => {
        res.json(success("PUT Pokemon", pokemon))
      })
    })
  })
}
