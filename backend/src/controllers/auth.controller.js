// Importar Librerias
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

// Inicializar Prisma
const prisma = new PrismaClient();

// Clave secreta para firmar los tokens
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Registro de usuario (cliente o conductor)

exports.registerUser = async (req, res) => {
  const { cedula, name, phone, password, role } = req.body;

  const allowedRoles = ["CLIENT", "DRIVER", "ADMIN"];
  const userRole = allowedRoles.includes(role) ? role : "CLIENT";

  const existingUser = await prisma.user.findUnique({ where: { cedula } });
  if (existingUser) {
    return res.status(400).json({
      error: "Ya existe un usuario con esta cédula, por favor inicie sesión",
    });
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      cedula,
      name,
      phone,
      password: hashedPassword,
      role: userRole,
    },
  });

  const token = jwt.sign(
    {
      cedula: newUser.cedula,
      role: newUser.role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return res.status(201).json({
    message: "Usuario registrado exitosamente",
    token,
    user: {
      cedula: newUser.cedula,
      name: newUser.name,
      phone: newUser.phone,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    },
  });
};

// ✅ Login de usuario

exports.loginUser = async (req, res) => {
  const { cedula, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { cedula },
    select: {
      cedula: true,
      name: true,
      phone: true,
      password: true,
      email: true,
      address: true,
      role: true,
      photo: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  try {
    if (!user) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado, por favor registrese" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { cedula: user.cedula, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: hashedPassword, ...safeUser } = user;

    return res.json({
      message: "Login exitoso",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({
      error: "Error interno al iniciar sesión",
      details: error.message,
    });
  }
};
