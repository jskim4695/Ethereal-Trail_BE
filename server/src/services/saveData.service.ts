import { SaveData } from '@prisma/client';
import { SaveDataRepository } from '../repositories/saveData.repository';

export default interface SaveDataInput {
  stage: number;
  health?: number;
  mana?: number;
  playtime: number;
  changerPaid: number;
  changerFree?: number;
  talent?: string;
  specificity?: number;
  retry: number;
  revival: number;
  trialOrb: number;
  pet?: number;
  isClear: boolean;
}

export class SaveDataService {
  private saveDataRepository: SaveDataRepository;

  constructor() {
    this.saveDataRepository = new SaveDataRepository();
  }

  async saveUserData(userId: number, saveDataInput: SaveDataInput): Promise<SaveData> {
    const user = await this.saveDataRepository.findUserById(userId);
    if (!user) {
      throw new Error('유저를 찾지 못하였습니다.');
    }

    // 항상 새로 생성
    return this.saveDataRepository.createSaveData(userId, {
      ...saveDataInput,
      isClear: false,
    });
  }

  async loadUserData(userId: number): Promise<SaveData> {
    const saveData = await this.saveDataRepository.findSaveDataByUserId(userId);
    if (!saveData) {
      throw new Error('유저의 세이브데이터가 존재하지 않습니다.');
    }

    // 불러온 후 삭제
    await this.saveDataRepository.deleteSaveDataById(saveData.id);

    return saveData;
  }
}
