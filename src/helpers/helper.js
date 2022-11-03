import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
