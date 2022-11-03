import { Pokemon } from "../config/db.js"
import { success } from "../helpers/helper.js"

export const deletePokemon = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    const { id } = req.params
    Pokemon.findByPk(id).then(pokemon => {
      const pokemonDeleted = pokemon;
      Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        res.json(success("DELETE Pokemon", pokemonDeleted))
      })
    })
  })
}
