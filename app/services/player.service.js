
const playerModel = require('../models/player.model');

class PlayerService {

  constructor() {
    this.player = new playerModel();
  }

  async addPlayer(username) {
    if (username === '') {
      username = 'ANONIM';
    } else {
      // si el nom ja existeix no s'inserta a la bd
      const num = await this.player.getNum({ username: username });
      if ( num > 0) {
        return false;
      }
    }
    await this.player.add(username);
    return true;
  }

  async getPlayer(id) {
    return await this.player.get(id);
  }

  async getAllPlayers() {
    return await this.player.getAll();
  }

}

module.exports = PlayerService;