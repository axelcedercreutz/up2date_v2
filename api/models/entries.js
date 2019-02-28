'use strict';
module.exports = function(sequelize, DataTypes) {
  var Entries = sequelize.define('Entries', {
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    type: DataTypes.STRING,
    heavy: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Entries;
};