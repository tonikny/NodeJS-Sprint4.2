const { PlayerSequelize } = require('../../databases/sequelize');
const Game = require('./game.model');


class Player {

  constructor() {
    this.dbo = PlayerSequelize.build({});
  }

  async add(username) {
    this.dbo.username = username;
    await this.dbo.save();
  }

  async get(id) {
    const player = await PlayerSequelize.findByPk(id);
    if (player !== null) {
      //console.log(player.toJSON());
      return player.toJSON();
    } else {
      return false;
    }
  }

  async getAll(where) {
    let opcions = { raw: true };
    if (where) {
      opcions = { raw: true, where };
    }
    const playerList = await PlayerSequelize.findAll(opcions);
    //console.log(playerList);
    return playerList;
  }

  async getNum(where) {
    return await PlayerSequelize.count({ where });
  }

  async edit(id, username) {
    this.dbo = await PlayerSequelize.findByPk(id);
    this.dbo.username = username;
    await this.dbo.save();
  }

  async addGame(playerId, primerDau, segonDau) {
    const game = new Game();
    await game.add(playerId, primerDau, segonDau);
  }

  async getAllGames(playerId) {
    const game = new Game();
    return await game.getAll(playerId, primerDau, segonDau);
  }

  async deleteGames(playerId) {
    const game = new Game();
    await gameObj.deleteGames(playerId);
  }

  async getAllGames(playerId) {
    const game = new Game();
    return await game.getAll(playerId);
  }

}

module.exports = Player;