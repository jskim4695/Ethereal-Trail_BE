// src/types/express/index.d.ts
// TODO 스팀로그인으로 변경시 제거 필요
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
