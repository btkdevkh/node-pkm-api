import express from 'express'
import morgan from 'morgan'
import path from 'path';
import favicon from 'serve-favicon'
import { connectDB, syncDB } from './src/config/db.js'
import { dirnameESModule } from './src/helpers/helper.js'
import { createPokemon } from './src/routes/createPokemon.js';
import { deletePokemon } from './src/routes/deletePokemon.js';
import { findAllPokemons } from './src/routes/findAllPokemons.js';
import { findPokemonByPk } from './src/routes/findPokemonByPk.js';
import { updatePokemon } from './src/routes/updatePokemon.js';

// init express app
const app = express()
const PORT = 5000

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(dirnameESModule(), '../../public', 'favicon.ico'))).use(morgan('dev'))

// db stuff
connectDB()
syncDB()

// endpoints
findAllPokemons(app)
findPokemonByPk(app)
createPokemon(app)
updatePokemon(app)
deletePokemon(app)

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`))

// 4h:23m
