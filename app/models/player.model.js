const { PlayerSequelize } = require('../databases/sequelize');

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

}

module.exports = Player;