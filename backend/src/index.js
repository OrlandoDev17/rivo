// Importar librerias
const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

// Importar y configurar Socket.IO
const { initSocket } = require("./utils/socket");

// Importar rutas
const authRoutes = require("./routes/auth.routes");
const rideRoutes = require("./routes/ride.routes");

// Inicializar la app de express
const app = express();
const server = http.createServer(app);

// Inicializar Socket.IO
initSocket(server);

// Middlewares globales
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3333;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Rivo backend corriendo en el puerto ${PORT}`);
});
