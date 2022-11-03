import { Op } from "sequelize"
import { Pokemon } from "../config/db.js"
import { success } from "../helpers/helper.js"

export const findAllPokemons = (app) => {
  app.get('/api/pokemons', (req, res) => {
    const { name, limit } = req.query
    
    if(name) {
      if(name.length < 2) {
        return res.status(400).json(success(`SEARCH & READ pokemons by name must be 2 chars`, []))
      }

      return Pokemon.findAndCountAll({ 
        where: { 
          name: {
            [Op.like]: `%${name}%`
          } 
        },
        order: ['name'],
        limit: +limit || 5
      })
      .then(({ count, rows }) => {
        res.json(success(`SEARCH & READ ${count} pokemons by name`, rows))
      })
    } else {
      Pokemon.findAll({ order: ['name'] }) 
        .then(pokemons => {
          res.json(success("READ pokemons", pokemons))
        })
        .catch(err => res.status(500).json({ message: "Can not READ pokemons", data: err }))
    }
  })
}
