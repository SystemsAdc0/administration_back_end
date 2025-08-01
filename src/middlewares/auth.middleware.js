import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "token no proporcionado" });
  }
  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const verifyRole = (role) => {
  return (req, res, next) => {
    if (!req.user || !role.includes(req.user.role)) {
      return res
        .status(403)
        .json({ msg: "Acceso denegado: permiso insuficiente" });
    }
    next();
  };
};

export class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
