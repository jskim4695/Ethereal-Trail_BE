import { PrismaClient } from '@prisma/client';

class AuthRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public findUserBySteamIdAndNickname = async (steamId: string, nickname: string) => {
    return await this.prisma.user.findFirst({
      where: {
        steamId,
        nickname,
      },
    });
  };
}

export default AuthRepository;
