// Importamos las librerías necesarias
const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config(); // Carga las variables de entorno desde .env

// Importamos las rutas
const authRoutes = require("./routes/auth.routes");
const rideRoutes = require("./routes/ride.routes");
const adminRoutes = require("./routes/adminData.routes");
const profileRoutes = require("./routes/profile.routes");

// Importamos y configuramos Socket.IO
const { initSocket } = require("./utils/socket");

// Inicializamos la app de Express
const app = express();
const server = http.createServer(app); // Servidor HTTP para Socket.IO

// Inicializamos Socket.IO con el servidor
initSocket(server);

// Middlewares globales
app.use(cors());

app.use(express.json()); // Permite recibir datos en formato JSON

// Usar Rutas
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api", adminRoutes);
app.use("/api/user", profileRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3333;

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`✅ RideNow backend corriendo en puerto ${PORT}`);
});
