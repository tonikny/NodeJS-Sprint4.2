const mongoose = require('mongoose');

mongoose.set('debug', process.env.DEBUG_DB === 'true')
mongoose.connect(process.env.DB_CONN_MONGO_URL + '?serverSelectionTimeoutMS=5000')
  //.then(() => console.log('connected to mongodb'))
  .catch((e) => {
    console.log("Conexió a MongoDB ha trigat massa")
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
        _id: 1, username: 'toni', games: [
          { primerDau: 4, segonDau: 5 },
          { primerDau: 5, segonDau: 6 },
          { primerDau: 4, segonDau: 3 },
          { primerDau: 2, segonDau: 5 },
        ]
      },
      {
        _id: 2, username: 'pep', games: [
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
