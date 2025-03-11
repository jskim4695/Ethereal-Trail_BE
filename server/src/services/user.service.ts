import { UserRepository } from './../repositories/user.repository';
import { User } from '@prisma/client';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }

  async createUser(data: Partial<User>): Promise<void> {
    const { steamId, aether, items, nickname, icon } = data;
    try {
      const user = await this.userRepository.selectOneUserBySteamId(steamId);
      if (user) {
        throw {
          code: 401,
          message: '이미 가입한 이메일입니다.',
        };
      }
      await this.userRepository.createUser({
        steamId,
        nickname,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    return this.userRepository.updateUser(userId, data);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.deleteUser(userId);
  }
}
