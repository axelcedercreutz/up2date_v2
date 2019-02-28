'use strict';
module.exports = function(sequelize, DataTypes) {
  var Media = sequelize.define('Media', {
    title: DataTypes.STRING,
    youtube_id: DataTypes.STRING,
    team_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Media;
};