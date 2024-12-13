import jwt from 'jsonwebtoken';

export interface JWTPayload {
  id: string;
  username: string;
  email: string;
}

export const generateJWTToken = async (payload: JWTPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
};

export const varifyJwt = (token: string) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
  return decodedToken as JWTPayload;
};
