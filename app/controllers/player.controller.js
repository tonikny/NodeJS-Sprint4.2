
const PlayerService = require('../services/player.service');

const playerService = new PlayerService();

module.exports = PlayerController = {

  addPlayer: async (req, res) => {
    let username = '';
    if (req.body.username) {
      username = req.body.username
    }
    if (await playerService.addPlayer(username)) {
      res.status(201).send({ msg: 'Jugador creat!' }); // Created 
    } else {
      res.status(409).send({ error: 'Nom repetit!' }); // Conflict
    }
  },

  editPlayer: async (req, res) => {
    if (req.body.id && req.body.username) {
      if (await playerService.editPlayer(req.body.id, req.body.username)) {
        res.status(201).send({ msg: 'Jugador modificat!' }); // Created 
      } else {
        res.status(409).send({ error: 'Nom repetit!' }); // Conflict
      }
    } else {
      res.status(400).send({ error: 'Bad Request' });
    }
  },

  getPlayer: async (req, res) => {
    if (req.params.id) {
      const userData = await playerService.getPlayer(req.params.id);
      res.status(200).json({ msg: userData }); // Ok
    } else {
      res.status(400).send({ error: 'Bad Request' });
    }
  },

  getAllPlayers: async (req, res) => {
    const playersData = await playerService.getAllPlayers();
    res.status(200).json({ msg: playersData }); // Ok
  },

  addGame: async (req, res) => {
    if (req.params.id) {
      const gameAdded = await playerService.addGame(req.params.id);
      if (gameAdded) {
        res.status(200).send({ msg: 'Jugada creada' }); // Ok
      } else {
        res.status(404).send({ error: 'Not Found' });
      }
    } else {
      res.status(400).send({ error: 'Bad Request' });
    }
  },

  getAllGames: async (req, res) => {
    if (req.params.id) {
      const playerData = await playerService.getPlayer(req.params.id);
      if (playerData) {
        const games = await playerService.getAllGames(req.params.id);
        res.status(200).json({ msg: games }); // Ok
      } else {
        res.status(404).send({ error: 'Not Found' });
      }
    } else {
      res.status(400).send({ error: 'Bad Request' });
    }
  },

  deleteGames: async (req, res) => {
    if (req.params.id) {
      const playerData = await playerService.getPlayer(req.params.id);
      if (playerData) {
        await playerService.deleteGames(req.params.id);
        res.status(200).send({ msg: 'Jugades esborrades' }); // Ok
      } else {
        res.status(404).send({ error: 'Not Found' });
      }
    } else {
      res.status(400).send({ error: 'Bad Request' });
    }
  },

  getWinner: async (req, res) => {
    const playerData = await playerService.getWinner();
    if (playerData) {
      res.status(200).json({ msg: playerData }); // Ok
    } else {
      res.status(404).send({ error: 'Not Found' });
    }
  },

  getLoser: async (req, res) => {
    const playerData = await playerService.getLoser();
    if (playerData) {
      res.status(200).json({ msg: playerData }); // Ok
    } else {
      res.status(404).send({ error: 'Not Found' });
    }
  },

  ranking: async (req, res) => {
    const ranking = await playerService.ranking();
    if (ranking) {
      res.status(200).send({ msg: ranking.toString() }); // Ok
    } else {
      res.status(404).send({ error: 'Not Found' });
    }
  }

}

module.exports = PlayerController;