import { Pokemon } from "../config/db.js"
import { success } from "../helpers/helper.js"

export const findAllPokemons = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll() 
      .then(pokemons => {
        res.json(success("GET pokemons", pokemons))
      })
  })
}
