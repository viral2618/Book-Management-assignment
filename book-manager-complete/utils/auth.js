import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_NAME = "token";


export function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getUserIdFromRequest(request) {
  const token = request.cookies.get(TOKEN_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);

  return payload?.userId || null;
}

export { TOKEN_NAME };
