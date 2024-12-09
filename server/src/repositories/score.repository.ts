// repositories/score.repository.ts
import { prisma } from '../utils/prisma/index';

export class ScoreRepository {
  // 점수 추가
  async addScore(name: string, score: number) {
    return await prisma.score.create({
      data: {
        name,
        score,
      },
    });
  }

  // 점수 목록 조회
  async getScores() {
    return await prisma.score.findMany();
  }
}
