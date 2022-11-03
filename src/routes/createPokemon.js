import { Pokemon } from "../config/db.js"
import { success } from "../helpers/helper.js"

export const createPokemon = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body) 
      .then(pokemon => {
        res.json(success("POST Pokemon", pokemon))
      })
  })
}
