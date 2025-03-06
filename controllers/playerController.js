const Player = require("../models/player");

// Get all players
exports.getPlayers = async (req, res) => {
    const players = await Player.find();
    res.json(players);
};

// Get a player by ID
exports.getPlayerById = async (req, res) => {
    const player = await Player.findOne({ id: parseInt(req.params.id) });
    player ? res.json(player) : res.status(404).json({ error: "Player Not Found" });
};

// Add a new player
exports.addPlayer = async (req, res) => {
    const { nom, idEquipe, numero, poste } = req.body;
    if (!nom || !idEquipe || !numero || !poste)
        return res.status(400).json({ error: "All fields are required" });

    const lastPlayer = await Player.findOne().sort({ id: -1 });
    const newPlayer = new Player({
        id: lastPlayer ? lastPlayer.id + 1 : 1,
        nom, idEquipe, numero, poste
    });

    await newPlayer.save();
    res.status(201).json({ message: "Player added successfully", player: newPlayer });
};

// Update a player
exports.updatePlayer = async (req, res) => {
    const { nom, idEquipe, numero, poste } = req.body;
    if (!nom || !idEquipe || !numero || !poste)
        return res.status(400).json({ error: "All fields are required" });

    const updatedPlayer = await Player.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { nom, idEquipe, numero, poste },
        { new: true }
    );

    updatedPlayer
        ? res.json({ message: "Player updated successfully", player: updatedPlayer })
        : res.status(404).json({ error: "Player Not Found" });
};

// Delete a player
exports.deletePlayer = async (req, res) => {
    const deletedPlayer = await Player.findOneAndDelete({ id: parseInt(req.params.id) });

    deletedPlayer
        ? res.status(202).json({ message: "Player deleted successfully" })
        : res.status(404).json({ error: "Player Not Found" });
};

