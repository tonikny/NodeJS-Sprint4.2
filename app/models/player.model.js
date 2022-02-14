
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_CONN,{logging: false});

class Player extends Model {

  constructor() {
    super();
  }

  add(username) {
    // TODO: 

  }

  async get(id) {
    const player = await Player.findByPk(id);
    if (player === null) {
      console.log('Not found!');
    } else {
      console.log(player instanceof Player); // true
      console.log(player.toJSON());
      return player.toJSON();
    }
  }

  static async getAll() {
    return await Player.findAll();
  }

}

Player.init({
  //_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true },
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'player' });


(async () => {
  await sequelize.sync();
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