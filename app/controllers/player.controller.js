
const PlayerService = require('../services/player.service');

const playerService = new PlayerService();

module.exports = PlayerController = {

  addPlayer: async (req, res) => {
    let username = '';
     if (req.body.username) {
      username = req.body.username
    }
    if (await playerService.addPlayer(username)) {
    res.status(201).send('Jugador creat!'); 
    } else {
      res.status(409).send('Nom repetit!');
    }
  },

  getPlayer: async (req, res) => {
    if (req.params.id) {
      const userData = await playerService.getPlayer(req.params.id);
      res.status(200).send(userData);
    } else {
      res.status(400).send('');
    }
  },

  getAllPlayers: async (req, res) => {
    const userData = await playerService.getAllPlayers();
    res.status(200).send(userData);
  },

  deletePlayer: async (req, res) => {

  }

}

module.exports = PlayerController;