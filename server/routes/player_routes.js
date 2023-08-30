const PlayerController = require('../controllers/players_controller');  //Import the code from Code Block 1

module.exports = (app) => {
    // app.get('/api', AuthorController.index);
    app.get('/api/players', PlayerController.findAllPlayers);
    app.get('/api/players/:id', PlayerController.findOneSinglePlayer);
    app.put('/api/players/:id', PlayerController.updateExistingPlayer);
    app.post('/api/players', PlayerController.createNewPlayer);
    app.delete('/api/players/:id', PlayerController.deleteAnExistingPlayer);
    // app.get('/api/status/game/:gameID', PlayerController.findAllPlayers);
}