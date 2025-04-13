import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { steamId, nickname } = req.body;
      if (!steamId || !nickname) {
        return res.status(400).json({ message: 'steamId와 nickname을 입력해주세요.' });
      }

      const { user, token } = await this.authService.login(steamId, nickname);
      if (!user) {
        return res.status(401).json({ message: '유효하지 않은 사용자입니다.' });
      }

      // 토큰을 Response Body에 포함
      return res.status(200).json({
        message: '로그인 성공',
        user,
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '서버 에러' });
    }
  };
}

export default new AuthController();
