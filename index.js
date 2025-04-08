require("dotenv").config();
require("./config/db");
require("./config/agenda");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("App Running");
});

// Routes
const nodeRoutes = require("./routes/nodeRoutes");
app.use("/api", nodeRoutes);

const scheduleRoutes = require("./routes/scheduleRoutes");
app.use("/api", scheduleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
