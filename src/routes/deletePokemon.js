import { Pokemon } from "../config/db.js"
import { success } from "../helpers/helper.js"
import { auth } from "../middlewares/auth.js"

export const deletePokemon = (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
    const { id } = req.params
    Pokemon.findByPk(id)
      .then(pokemon => {
        const pokemonDeleted = pokemon;
        return Pokemon.destroy({
          where: { id: pokemon.id }
        })
      .then(_ => {
        res.json(success("DELETE Pokemon", pokemonDeleted))
      })
      .catch(err => res.status(500).json({ message: "Can not DELETE pokemons", data: err }))
    })
  })
}
