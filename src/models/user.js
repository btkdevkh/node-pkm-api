import { sequelize, DataTypes } from "../config/db.js";

const user = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Le nom est déja pris"
    },
    validate: {
      notEmpty: { msg: "Username est obligatoir" },
      notNull: { msg: "Champ requise" }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Password est obligatoir" },
      notNull: { msg: "Champ requise" }
    }
  }
}

export const UserModel = () => {
  return sequelize.define('User', user, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
