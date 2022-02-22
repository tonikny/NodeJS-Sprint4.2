const { GameSequelize } = require('../../databases/sequelize');

class Game {

  constructor() {
    this.dbo = GameSequelize.build({});
  }

  async add(playerId, primer, segon) {
    this.dbo.playerId = playerId;
    this.dbo.primerDau = primer;
    this.dbo.segonDau = segon;
    await this.dbo.save();
  }

  async getAll(playerId) {
    let opcions = {
      raw: true,
      where: {
        playerId: playerId
      }
    };
    const gameList = await GameSequelize.findAll(opcions);
    return gameList;
  }

  async deleteGames(playerId) {
    const opcions = {
      where: {
        playerId: playerId
      }
    };
    await GameSequelize.destroy(opcions);
  }

}

module.exports = Game;