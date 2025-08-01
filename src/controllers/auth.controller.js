import { generateJwt } from "../utils/generateToken.js";

const dbDemo = [
  { name: "jorge", password: 123, role: "admin", email: "jorge@gmail.com" },
  { name: "adan", password: 123, role: "RH", email: "adan@gmail.com" },
];

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "missing values" });
  }
  const verify = dbDemo.find(
    (value) => value.email == email && value.password == password
  );

  if (!verify) res.status(400).json({ msg: "usuario no registrado" });
  const token = generateJwt(verify);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
  res.status(200).json({ msg: "inico de sesion exitoso" });
};
