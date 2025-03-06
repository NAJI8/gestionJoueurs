const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    nom: String,
    idEquipe: Number,
    numero: Number,
    poste: String
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;