const express = require('express');
const router = express.Router();

/* 
POST /players: crea un jugador
PUT /players: modifica el nom del jugador
POST /players/{id}/games: un jugador específic realitza una tirada
DELETE /players/{id}/games: elimina les tirades del jugador
GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
GET /players/{id}/games: retorna el llistat de jugades per un jugador.
GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit
 */

router.post('/players');

router.put('/players');

router.post('/players/:id/games');

router.delete('/players/:id/games');

router.get('/players');

router.get('/players/:id/games');

router.get('/players/ranking');

router.get('/players/ranking/loser');

router.get('/players/ranking/winner');



/* 
const rutaUser = require('../controllers/user');
router.get('/user', rutaUser.user);

const { uploadSingle, uploadImatge } = require('../controllers/upload');
router.post('/upload', uploadSingle, uploadImatge);

const cors = require('cors');
const auth = require('../middlewares/auth');
const noCache = require('../middlewares/noCache');
const time = require('../controllers/time');
router.post(
  '/time',          // ruta
  auth,             // app/middlewares/auth.js
  cors(),           // cors (express)
  noCache,          // app/middlewares/noCache.js
  express.json(),   // per acceptar paràmetre json
  time              // retorna data/hora si hi ha parámetre usuari
);
 */

module.exports = { router }