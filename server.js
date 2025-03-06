const express = require("express");
const connectDB = require("./config/db");
const playerRoutes = require("./routs/playerRoutes");

const app = express();
const PORT = 1234;

// Connect to MongoDB
connectDB();

app.use(express.json());

// Use Player Routes
app.use("/players", playerRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
