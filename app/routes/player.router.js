const express = require('express');
const router = express.Router();

const playerController = require('../controllers/player.controller');
const authJWT = require('../middlewares/authJWT');


router.use(authJWT);


router.post('/', playerController.addPlayer);

router.put('/', playerController.editPlayer);

router.post('/:id/games', playerController.addGame);

router.delete('/:id/games', playerController.deleteGames);

router.get('/', playerController.getAllPlayers);

router.get('/:id/games', playerController.getAllGames);

router.get('/ranking', playerController.ranking);

router.get('/ranking/loser', playerController.getLoser);

router.get('/ranking/winner', playerController.getWinner);


module.exports = { router }
