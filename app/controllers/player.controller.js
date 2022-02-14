
const PlayerService = require('../services/player.service');

/* class PlayerController {

  addPlayer(req, res) {
    let username = '';
    if (req.boby.username) {
      username = req.boby.username
    }
    const userData = playerService.addPlayer(username);
    res.send(userData);
  }

  getPlayer(req, res) {
    if (req.params.id) {
      const userData = playerService.getPlayer(req.params.id);
      res.send(userData);

    }
  }

} */
module.exports = PlayerController = {

  addPlayer: (req, res) => {
    let username = '';
    if (req.boby.username) {
      username = req.boby.username
    }
    const userData = playerService.addPlayer(username);
    res.send(userData);
  },

getPlayer: (req, res) => {
    if (req.params.id) {
      const userData = playerService.getPlayer(req.params.id);
      res.send(userData);
    }
  },

  getAllPlayers: (req, res) => {
    const playerService = new PlayerService();
    const userData = playerService.getAllPlayers();
    res.send(userData);
  }
  
}


/* const addPlayer = (req, res) => {
  let username = '';
  if (req.boby.username) {
    username = req.boby.username
  }
  const userData = playerService.addPlayer(username);
  res.send(userData);
} */

module.exports = PlayerController;