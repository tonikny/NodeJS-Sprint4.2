
const playerModel = require('../models/player.model');

class PlayerService {

  constructor() {
    this.player = new playerModel();
  }

  async addPlayer(username) {
    if (username === '') {
      username = 'ANONIM';
    } else {
      const num = await this.player.getNum({ username });
      console.log(num);
      if ( num > 0) {
        return;
      }
    }
    await this.player.add(username);
  }

  async getPlayer(id) {
    return await this.player.get(id);
  }

  async getAllPlayers() {
    return await this.player.getAll();
  }

}

module.exports = PlayerService;