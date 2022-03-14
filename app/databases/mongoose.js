const mongoose = require('mongoose');

mongoose.set('debug', process.env.DEBUG_DB === 'true');

const host = process.env.MONGO_DB_HOST || 'localhost';
const port = process.env.MONGO_DB_PORT || '27017';
const dbName = process.env.MONGO_DB_NAME || 'rest_4_2';

mongoose.connect('mongodb://' + host + ':' + port + '/' + dbName,
  {
    user: process.env.MONGO_DB_USER,
    pass: process.env.MONGO_DB_PASS,
    serverSelectionTimeoutMS: 5000
  })
  //.then(() => console.log('connected to mongodb'))
  .catch((e) => {
    console.log("Connexió a MongoDB ha trigat massa")
    console.log(e);
    process.exit()
  });


const Schema = mongoose.Schema;

const playerSchema = new Schema({
  _id: Number,
  username: String,
  games: [{
    primerDau: Number,
    segonDau: Number,
  }]
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

const PlayerMongoose = mongoose.model('player', playerSchema);

(async () => {
  const recreateDb = process.env.RECREATE_DB === 'true';
  if (recreateDb) {
    await PlayerMongoose.deleteMany({});
    await PlayerMongoose.insertMany([
      {
        _id: 1, username: 'prova_1', games: [
          { primerDau: 4, segonDau: 5 },
          { primerDau: 5, segonDau: 6 },
          { primerDau: 4, segonDau: 3 },
          { primerDau: 2, segonDau: 5 },
        ]
      },
      {
        _id: 2, username: 'prova_2', games: [
          { primerDau: 1, segonDau: 5 },
          { primerDau: 6, segonDau: 1 },
          { primerDau: 3, segonDau: 5 },
          { primerDau: 4, segonDau: 6 },
        ]
      }
    ]);
  }
})();

module.exports = { PlayerMongoose }
