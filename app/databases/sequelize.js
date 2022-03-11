const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');

const debug = (process.env.DEBUG_DB === 'true') ? console.log : false;

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_DB_USER,
  process.env.MYSQL_DB_PASS,
  {
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    dialect: 'mysql',
    logging: debug
  }
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
  const recreateDb = process.env.RECREATE_DB === 'true'
  await sequelize.sync({ force: recreateDb });
  if (recreateDb) {
    await PlayerSequelize.bulkCreate([
      { id: 1, username: 'toni' },
      { id: 2, username: 'pep' }
    ]);
    await GameSequelize.bulkCreate([
      { primerDau: 4, segonDau: 5, playerId: 1 },
      { primerDau: 5, segonDau: 6, playerId: 1 },
      { primerDau: 4, segonDau: 3, playerId: 1 },
      { primerDau: 2, segonDau: 5, playerId: 1 },
      { primerDau: 1, segonDau: 5, playerId: 2 },
      { primerDau: 6, segonDau: 1, playerId: 2 },
      { primerDau: 3, segonDau: 5, playerId: 2 },
      { primerDau: 4, segonDau: 6, playerId: 2 },
    ]);
  }
})();

module.exports = { PlayerSequelize, GameSequelize };