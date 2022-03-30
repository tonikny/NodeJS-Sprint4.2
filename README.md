
# REST API - JOC DE DAUS

- ## Instal·lació
  - Clonació del projecte:
    - `git clone https://github.com/tonikny/NodeJS-Sprint4.2.git`
  - Instal·lació de llibreries:
    - `npm install`

- ## Configuració
  - Copiar `.env_DIST` a `.env` i configurar connexions a bases de dades i opcions, així com usuari i contrasenya.
  - La opció de recrear la base de dades la destrueix (si existeix) i es crea de nou inserint alguns registres de prova.

- ## Ús
  - `npm start`

- ## Estructura del projecte

  - **app**:
      - **databases/** - esquemes de les taules
      - **controllers/** - gestió d'e/s 
      - **helpers/**
      - **middlewares/**
      - **models/** - models de classes (depenent del gestor de BD)
      - **routes/** - gestió de les rutes
      - **services/** - lògica de l'aplicació (indepenent del gestor de BD)
  - **app.js** - Punt d'entrada a l'aplicació
  - **.env_DIST** - template de .env
  - **package.json**
  - **proves_postman/** - proves de les rutes 

- ## Proves
  Les proves de rutes fan servir autenticació JWT que es genera fent login amb l'usuari i contrasenya definits a .env.

- ## Mòduls NPM necessaris

  - Express
  - Dotenv
  - Sequelize
  - Mysql2
  - Mongoose
