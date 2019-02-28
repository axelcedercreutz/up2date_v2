'use strict';
module.exports = function(sequelize, DataTypes) {
  var Regimens = sequelize.define('Regimens', {
    title: DataTypes.STRING,
    days: DataTypes.JSON,
    team_id: DataTypes.INTEGER,
    coach_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Regimens;
};