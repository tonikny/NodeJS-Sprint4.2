
# REST API

## Instal·lació
- Clonació del projecte:
  - `git clone https://github.com/tonikny/NodeJS-Sprint4.2.git`
- Instal·lació de llibreries:
  - `npm install`
- Copiar .env_DIST a .env i personalitzar-lo

## Ús
- `npm start`

## Estructura del projecte

- **app**:
    - **databases/** - esquemes de les taules
    - **controllers/** - gestió d'e/s 
    - **helpers/**
    - **middlewares/**
    - **models/** - models de classes (depenent del gestor de BD)
    - **routes/** - gestió de les rutes
    - **services/** - lògica de l'aplicació (indepenent del gestor de BD)
- **app.js** - Pun d'entrada a l'aplicació
- **.env_DIST** - template del .env
- **package.json**
- **proves_postman/** - proves de les rutes 

## Proves
Les proves de rutes amb autentificació fan servir l'id com a contrasenya i s'envia dins del body de la petició.

## Mòduls NPM necessaris

- Express
- Dotenv
- Sequelize
- Mysql2 / Mariadb
