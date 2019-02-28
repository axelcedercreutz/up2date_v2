'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: DataTypes.STRING,
    user_role: {type: DataTypes.INTEGER, allowNull: false},
    team_id: DataTypes.INTEGER,
    number: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};