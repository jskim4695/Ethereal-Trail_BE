import { PrismaClient, SaveData, User } from '@prisma/client';
import SaveDataInput from '../services/saveData.service';

export class SaveDataRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // 유저 존재 여부 확인
  async findUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  // 가장 최근 SaveData 조회 (isClear = false 우선)
  async findSaveDataByUserId(userId: number): Promise<SaveData | null> {
    return this.prisma.saveData.findFirst({
      where: {
        userId,
        isClear: false, // 중간 저장 데이터 우선
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // SaveData 생성 (항상 새로 생성)
  async createSaveData(userId: number, saveDataInput: SaveDataInput): Promise<SaveData> {
    return this.prisma.saveData.create({
      data: {
        stage: saveDataInput.stage,
        health: saveDataInput.health,
        mana: saveDataInput.mana,
        playtime: saveDataInput.playtime,
        changerPaid: saveDataInput.changerPaid,
        changerFree: saveDataInput.changerFree,
        talent: saveDataInput.talent,
        specificity: saveDataInput.specificity,
        retry: saveDataInput.retry,
        revival: saveDataInput.revival,
        trialOrb: saveDataInput.trialOrb,
        pet: saveDataInput.pet,
        isClear: saveDataInput.isClear,
        user: { connect: { id: userId } },
      },
    });
  }

  // 클리어 완료된 SaveData 저장 (중간 저장 불필요한 필드 제외)
  async createClearSaveData(
    userId: number,
    clearData: {
      stage: number;
      playtime: number;
      changerPaid: number;
      talent: string;
      specificity: number;
      retry: number;
      revival: number;
    },
  ): Promise<SaveData> {
    return this.prisma.saveData.create({
      data: {
        userId,
        stage: clearData.stage,
        playtime: clearData.playtime,
        changerPaid: clearData.changerPaid,
        talent: clearData.talent,
        specificity: clearData.specificity,
        retry: clearData.retry,
        revival: clearData.revival,
        isClear: true, // 클리어 데이터임을 명시
      },
    });
  }

  // SaveData 삭제
  async deleteSaveDataById(saveDataId: number): Promise<void> {
    await this.prisma.saveData.delete({
      where: { id: saveDataId },
    });
  }

  // 클리어된 SaveData 조회
  async findClearSaveDataByUserId(userId: number): Promise<SaveData | null> {
    return this.prisma.saveData.findFirst({
      where: {
        userId,
        isClear: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
