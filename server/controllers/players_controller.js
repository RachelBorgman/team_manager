const Player = require('../models/player_model');

module.exports.createNewPlayer = (req, res) => {
    Player.create(req.body)
        .then(player => res.json(player))
        .catch((err) => {
            res.status(400).json({ err });
        })
}

module.exports.findAllPlayers = (req, res) => {
    Player.find({})
        .then((allPlayers) => {
            res.json(allPlayers)
        })
        .catch((err) => {
            res.status(400).json({ err });
        })
}

module.exports.findOneSinglePlayer = (req, res) => {
    Player.findOne({ _id: req.params.id })
        .then(oneSinglePlayer => {
            res.json(oneSinglePlayer)
        })
        .catch((err) => {
            res.status(400).json({ err });
        })
}

module.exports.updateExistingPlayer = (req, res) => {
    Player.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedPlayer => {
            console.log("THIS IS UPDATED Player BEFORE RES.JSON: ", updatedPlayer)
            res.json(updatedPlayer)
            console.log("THIS IS UPDATED Player AFTER RES.JSON: ", updatedPlayer)
        })
        .catch((err) => {
            res.status(400).json({ err });
        })
}

module.exports.deleteAnExistingPlayer = (req, res) => {
    Player.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.status(400).json({ err });
        })
}