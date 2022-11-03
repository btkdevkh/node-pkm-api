import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const success = (message, data) => ({ message, data })

export const uuid = (pokemons) => {
  const pkmIDs = pokemons.map(pkm => pkm.id)
  const maxId = pkmIDs.reduce((a, b) => Math.max(a, b))
  const uniqueId = maxId + 1
  return uniqueId
}

export const dirnameESModule = () => {
  // define dirname in ES module
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return __dirname
}

export const hashPass = async (password) => {
  return await bcrypt.hash(password, 10)
}

export const comparePass = async (plainPass, dbPass) => {
  return await bcrypt.compare(plainPass, dbPass)
}

export const generateJWT = (payload) => {
  return jwt.sign(payload, 'bella123', { expiresIn: '24h' })
}
