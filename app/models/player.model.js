
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  process.env.MYSQL_CONN,
  // { logging: false }
);

class Player {

  constructor() {
    this.dbo = PlayerSequelize.build({});
  }

  async add(username) {
    this.dbo.username = username;
    await this.dbo.save();
  }

  async get(id) {
    const player = await this.dbo.findByPk(id);
    if (player !== null) {
      //console.log(player.toJSON());
      return player.toJSON();
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

}

const PlayerSequelize = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  createdAt: true,
  updatedAt: false,
  tableName: 'player'
});

(async () => {
  await sequelize.sync({ force: process.env.RECREATE_DB === 'true' });
  /* await PlayerSequelize.bulkCreate([
    { username: 'toni' },
    { username: 'prova' }
  ]); */
})();

module.exports = Player;