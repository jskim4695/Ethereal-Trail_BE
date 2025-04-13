import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  console.log('Received Authorization Header:', authHeader);
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"
  console.log('Extracted Token:', token);
  console.log('JWT Secret Key:', process.env.JWT_SECRET);

  if (!token) {
    res.status(401).json({ message: '토큰이 없습니다. 인증이 필요합니다.' });
    return; // 여기서 함수 종료
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS256'] });
    req.user = decoded;
    next(); // 다음 미들웨어로 이동
  } catch (error) {
    console.error('JWT Verification Error:', error);
    res.status(403).json({ message: `유효하지 않은 토큰입니다. ${error.message}` });
  }
};

export default authenticateToken;
