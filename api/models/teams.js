'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teams = sequelize.define('Teams', {
    user_id: DataTypes.INTEGER,
    coach_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Teams;
};