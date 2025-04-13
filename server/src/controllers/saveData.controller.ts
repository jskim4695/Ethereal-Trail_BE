import { Request, Response } from 'express';
import { SaveDataService } from '../services/saveData.service';

export class SaveDataController {
  private saveDataService: SaveDataService;

  constructor() {
    this.saveDataService = new SaveDataService();
  }

  async handleSaveUserData(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);
    const saveDataInput = req.body;

    try {
      const saveData = await this.saveDataService.saveUserData(userId, saveDataInput);
      res.status(200).json(saveData);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async handleLoadUserData(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);

    try {
      const data = await this.saveDataService.loadUserData(userId);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
