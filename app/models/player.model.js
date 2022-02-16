
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  process.env.MYSQL_CONN,
  //{ logging: false }
);

class Player {

  constructor() {
    this.dbo = PlayerSequelize.build({});
    //super();
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
    await PlayerSequelize.count({ where });
  }

}
/* 
Player.init({
  //_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true },
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'player' });
 */
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
  await sequelize.sync({ force: false });
  /* await PlayerSequelize.bulkCreate([
    { username: 'toni' },
    { username: 'prova' }
  ]); */
})();

/* (async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();
 */

module.exports = Player;