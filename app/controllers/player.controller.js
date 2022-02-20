
const PlayerService = require('../services/player.service');

const playerService = new PlayerService();

module.exports = PlayerController = {

  addPlayer: async (req, res) => {
    let username = '';
    if (req.body.username) {
      username = req.body.username
    }
    if (await playerService.addPlayer(username)) {
      res.status(201).send('Jugador creat!'); // Created 
    } else {
      res.status(409).send('Nom repetit!'); // Conflict
    }
  },

  getPlayer: async (req, res) => {
    if (req.params.id) {
      const userData = await playerService.getPlayer(req.params.id);
      res.status(200).send(userData); // Ok
    } else {
      res.status(400).send('Bad Request');
    }
  },

  getAllPlayers: async (req, res) => {
    const playersData = await playerService.getAllPlayers();
    res.status(200).send(playersData); // Ok
  },

  addGame: async (req, res) => {
    if (req.params.id) {
      const gameAdded = await playerService.addGame(req.params.id);
      if (gameAdded) {
        res.status(200).send('Jugada creada'); // Ok
      } else {
        res.status(404).send('Not Found');
      }
    } else {
      res.status(400).send('Bad Request');
    }
  },

  getAllGames: async (req, res) => {
    if (req.params.id) {
      const playerData = await playerService.getPlayer(req.params.id);
      if (playerData) {
        const games = await playerService.getAllGames(req.params.id);
        res.status(200).send(games); // Ok
      } else {
        res.status(404).send('Not Found');
      }
    } else {
      res.status(400).send('Bad Request');
    }
  },

  deleteGames: async (req, res) => {
    if (req.params.id) {
      const playerData = await playerService.getPlayer(req.params.id);
      if (playerData) {
        await playerService.deleteGames(req.params.id);
        res.status(200).send('Jugades esborrades'); // Ok
      } else {
        res.status(404).send('Not Found');
      }
    } else {
      res.status(400).send('Bad Request');    }
  },

  getWinner: async (req, res) => {
    const playerData = await playerService.getWinner();
    if (playerData) {
      res.status(200).send(playerData); // Ok
    } else {
      res.status(404).send('Not Found');
    }
  },

  getLoser: async (req, res) => {
    const playerData = await playerService.getLoser();
    if (playerData) {
      res.status(200).send(playerData); // Ok
    } else {
      res.status(404).send('Not Found');
    }
  }

}

module.exports = PlayerController;