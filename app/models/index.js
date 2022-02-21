let Player;
let Game;
let models;

switch (process.env.DB_TYPE) {
  case "MONGO":
    Player = require('./mongo/player.model');
    break;
  
  default: //case "SQL"
    Player = require('./sql/player.model');
    //Game = require('./sql/game.model');
}
models = { Player };

module.exports = models;