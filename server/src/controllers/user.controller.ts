import { Request, Response } from 'express';
import { UserService } from './../services/user.service';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { steamId, nickname } = req.body;
    if (!steamId) {
      return res.status(400).json({ success: false, message: '스팀 아이디는 필수값입니다.' });
    }

    if (!steamId || !nickname) {
      return res.status(400).json({ success: false, message: '필수값을 모두 입력해주세요.' });
    }
    try {
      const newUser = await this.userService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(err.code).json({ message: err.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);
      const updatedUser = await this.userService.updateUser(userId, req.body);
      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = Number(req.params.id);
      await this.userService.deleteUser(userId);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}
