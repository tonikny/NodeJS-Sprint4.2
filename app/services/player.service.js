
const playerModel = require('../models/player.model');

class PlayerService {

  constructor() {
    this.player = new playerModel();
  }

  addPlayer(username) {
    if (username === '') {
      username = 'ANONIM';
    }

    try {
      this.player.add(username);
      // TODO: preparar objecte per a retornar
      return this.player;
    } catch (e) {

    }
  }

  async getPlayer(id) {
    return await this.player.get(id);
  }

  async getAllPlayers() {
    return await playerModel.getAll();
  }

}

module.exports = PlayerService;