module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.ENUM(
        "HQ",
        "Nairobi",
        "Coast",
        "Rift",
        "Central",
        "Lake",
        "Eastern"
      ),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "supervisor", "salesperson"),
      allowNull: false,
    },
  });
  return User;
};
