import { sequelize, DataTypes } from "../config/db.js";

const validTypes = [
  "Plante", 
  "Poison", 
  "Feu", 
  "Eau", 
  "Insecte", 
  "Normal", 
  "Vol", 
  "Insecte", 
  "Electrik", 
  "Fée", 
  "Combat", 
  "Psy"
]

const pokemon = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Le nom est déja pris"
    },
    validate: {
      notEmpty: { msg: "Nom est obligatoir" },
      notNull: { msg: "Champ requise" }
    }
  },
  hp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Nombre entier seulement" },
      min: {
        args: [0],
        msg: "0 ou supérieus"
      },
      max: {
        args: [999],
        msg: "inférieurs ou 999"
      },
      notNull: { msg: "Champ requise" }
    }
  },
  cp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Nombre entier seulement" },
      min: {
        args: [0],
        msg: "0 ou supérieus"
      },
      max: {
        args: [99],
        msg: "inférieurs ou 999"
      },
      notNull: { msg: "Champ requise" }
    }
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: { msg: "Url doit être valide" },
      notNull: { msg: "Champ requise" }
    }
  },
  types: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('types').split(',')
    },
    set(types) {
      this.setDataValue('types', types.join())
    },
    validate: {
      isTypesValid(value) {
        if(!value) {
          throw new Error("1 Type min")
        }
        if(value.split(',').length > 3) {
          throw new Error("3 Types max")
        }
        value.split(',').forEach(type => {
          if(!validTypes.includes(type)) {
            throw new Error(`Le type doit être dans la liste suivant : ${validTypes}`)
          }
        })
      }
    }
  }
}

export const PokemonModel = () => {
  return sequelize.define('Pokemon', pokemon, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
