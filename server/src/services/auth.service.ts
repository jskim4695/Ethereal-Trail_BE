import jwt from 'jsonwebtoken';
import AuthRepository from '../repositories/auth.repository';

class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public login = async (steamId: string, nickname: string) => {
    const user = await this.authRepository.findUserBySteamIdAndNickname(steamId, nickname);

    if (!user) return { user: null, token: null };

    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

    // 확인용 로그 추가
    console.log('✅ JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);
    console.log('✅ 적용된 expiresIn 값:', expiresIn);

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id, steamId: user.steamId },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h', algorithm: 'HS256' },
    );
    console.log('JWT 생성 시 사용된 Secret:', process.env.JWT_SECRET);
    return { user, token };
  };
}

export default AuthService;
