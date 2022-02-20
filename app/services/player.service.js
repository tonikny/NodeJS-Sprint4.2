
const models = require('../models/');
const helper = require('../helpers/');

class PlayerService {

  constructor() {
    //this.player = new models.Player();
  }

  async addPlayer(username) {
    this.player = new models.Player();
    if (username === '') {
      username = 'ANONIM';
    } else {
      // si el nom ja existeix no s'inserta a la bd
      const num = await this.player.getNum({ username: username });
      if (num > 0) {
        return false;
      }
    }
    await this.player.add(username);
    return true;
  }

  async editPlayer(id, username) {
    this.player = new models.Player();
    const playerExist = await this.player.get(id);
    const nameExist = await this.player.getNum({ username: username });
    if (playerExist && !nameExist) {
      await this.player.edit(id,username);
      return true;
    } else {
      return false;
    }
  }

  async getPlayer(id) {
    this.player = new models.Player();
    return await this.player.get(id);
  }

  async getAllPlayers() {
    this.player = new models.Player();
    const players = await this.player.getAll();
    for (const player of players) {
      player.percentatgeExit = await this._getPercent(player.id);
    }
    return players;
  }

  async addGame(playerId) {
    this.player = new models.Player();
    if (await this.player.get(playerId)) {
      const primerDau = helper.tiraDau();
      const segonDau = helper.tiraDau();
      this.game = new models.Game();
      try {
        await this.game.add(playerId, primerDau, segonDau);
        return true;
      } catch (e) {
        console.error(e.code, e.message);
        return false;
      }
    } else {
      console.error('No existeix el jugador');
      return false;
    }
  }

  async getAllGames(playerId) {
    this.player = new models.Player();
    if (await this.player.get(playerId)) {
      const gameObj = new models.Game();
      const games = await gameObj.getAll(playerId);
      return games;
    } else {
      return false;
    }
  }

  async deleteGames(playerId) {
    this.player = new models.Player();
    if (await this.player.get(playerId)) {
      const gameObj = new models.Game();
      await gameObj.deleteGames(playerId);
      return true;
    } else {
      return false;
    }
  }

  async getWinner() {
    const players = await this.getAllPlayers();
    if (players) {
      let max = 0;
      let winner = {};
      players.forEach(player => {
        if (player.percentatgeExit > max) {
          max = player.percentatgeExit;
          winner = player;
        }
      });
      return winner;
    } else {
      return false;
    }
  }

  async getLoser() {
    const players = await this.getAllPlayers();
    if (players) {
      let min = 100;
      let loser;
      players.forEach(player => {
        if (player.percentatgeExit < min) {
          min = player.percentatgeExit;
          loser = player;
        }
      });
      return loser;
    } else {
      return false;
    }
  }

  async ranking() {
    const allPlayers = await this.getAllPlayers();
    let len = allPlayers.length
    let sum = 0;
    allPlayers.forEach((player) => {
      if (!isNaN(player.percentatgeExit)) {
        sum += player.percentatgeExit;
      } else {
        len--;
      }
    });
    if (len > 0) {
      return sum / len;
    } else {
      return false;
    }
  }

  async _getPercent(playerId) {
    const gameObj = new models.Game();
    const games = await gameObj.getAll(playerId);
    let cont = 0;
    for (const game of games) {
      if (game.primerDau + game.segonDau == 7) {
        cont++;
      }
    }
    const percent = 100 * cont / games.length;
    return percent;
  }

}

module.exports = PlayerService;