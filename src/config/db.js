import { Sequelize, DataTypes } from "sequelize";
import { PokemonModel } from "../models/pokemon.js";
import { UserModel } from "../models/user.js";
import pokemons from '../data/mock-pokemon.js'
import { hashPass } from "../helpers/helper.js";

const sequelize = new Sequelize(
  'pokedex',
  'root',
  '123456789',
  {
    host: 'localhost',
    dialect: "mysql",
    dialectOptions: {
      timezone: 'Etc/GMY-2'
    },
    logging: false
  }
)

const connectDB = async () => {
  return sequelize.authenticate()
  .then(_ => console.log('DB Successfully Connected'))
  .catch(err => console.log(err))
}

const Pokemon = PokemonModel()
const User = UserModel()

const syncDB = async () => {
  const hashedPassword = await hashPass('1234');

  return sequelize.sync({force: true})
  .then(_ => {
    console.log('DB Successfully Synced')

    pokemons.map(pkmn => {
      Pokemon.create({
        name: pkmn.name,
        hp: pkmn.hp,
        cp: pkmn.cp,
        picture: pkmn.picture,
        types: pkmn.types,
      }).then(bulbizarre => console.log(bulbizarre.toJSON()))
    })

    User.create({
      username: "jim91",
      password: hashedPassword
    }).then(user => console.log(user.toJSON()))
  })
  .catch(err => console.log(err))
}

export { sequelize, DataTypes, connectDB, syncDB, Pokemon, User }
