
const PlayerService = require('../services/player.service');

const playerService = new PlayerService();

module.exports = PlayerController = {

  addPlayer: async (req, res) => {
    let username = '';
     if (req.body.username) {
      username = req.body.username
    }
    const userData = await playerService.addPlayer(username);
    res.send(userData); 
  },

  getPlayer: async (req, res) => {
    if (req.params.id) {
      const userData = await playerService.getPlayer(req.params.id);
      res.send(userData);
    }
  },

  getAllPlayers: async (req, res) => {
    //const playerService = new PlayerService();
    const userData = await playerService.getAllPlayers();
    //console.log(userData);
    res.send(userData);
  }

}

module.exports = PlayerController;