const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_CONN_URL,
  { logging: process.env.DEBUG_DB === 'true' }
);

/* 
Definicio de les taules
 */
const PlayerSequelize = sequelize.define('player', {
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

const GameSequelize = sequelize.define('game', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  primerDau: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  segonDau: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  createdAt: true,
  updatedAt: false,
  tableName: 'game'
});


PlayerSequelize.hasMany(GameSequelize);
GameSequelize.belongsTo(PlayerSequelize);



(async () => {
  await sequelize.sync({ force: process.env.RECREATE_DB === 'true' });
  /* await PlayerSequelize.bulkCreate([
    { username: 'toni' },
    { username: 'prova' }
  ]); */
})();

module.exports = { PlayerSequelize, GameSequelize };