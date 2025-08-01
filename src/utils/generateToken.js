import jwt from "jsonwebtoken";
export function generateJwt(data) {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
  return token;
}
