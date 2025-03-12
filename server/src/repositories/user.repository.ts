import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async createUser(data: Partial<User>): Promise<User> {
    return this.prisma.user.create({
      data: {
        steamId: data.steamId,
        nickname: data.nickname,
        aether: data.aether,
        items: data.items,
        icon: data.icon,
      },
    });
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  selectOneUserBySteamId = async (steamId) => {
    const user = await this.prisma.user.findFirst({
      where: {
        steamId,
      },
    });
    return user;
  };
}
