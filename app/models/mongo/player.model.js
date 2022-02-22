const { PlayerMongoose } = require('../../databases/mongoose');

class Player {

  constructor() {

  }

  async add(username) {
    try {
      const players = await PlayerMongoose.find()
      const id = (players.length === 0) ? 1 : Math.max.apply(Math, players.map(function (o) { return o.id; })) + 1;

      const player = new PlayerMongoose({
        _id: id,
        username: username,
        games: []
      });
      await player.save();
    } catch (e) {
      console.log(e)
    }
  }

  async get(id) {
    const player = await PlayerMongoose.findById(id, { games: 0 });
    return player;
  }

  async getAll() {
    const players = await PlayerMongoose.find({}, { games: 0 });
    if (!players.length) {
      return null;
    }
    return players.map(x => {
      const y = x.toJSON();
      y.id = x._id;
      delete y['_id']
      delete y['__v'];
      return y;
    });
  }

  async getNum(where) {
    const num = await PlayerMongoose.count(where);
    return num;
  }

  async edit(id, username) {
    await PlayerMongoose.findOneAndUpdate({ _id: id }, { username: username })
  }

  async addGame(playerId, primer, segon) {
    await PlayerMongoose.updateOne(
      { _id: playerId },
      { $push: { games: { primerDau: primer, segonDau: segon } } }
    );
  }

  async getAllGames(playerId) {
    const player = await PlayerMongoose.findById(playerId);
    return player.games;
  }

  async deleteGames(playerId) {
    await PlayerMongoose.findOneAndUpdate({ _id: playerId }, { games: [] })
  }

}

module.exports = Player;