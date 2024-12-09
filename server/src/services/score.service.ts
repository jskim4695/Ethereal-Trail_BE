// services/score.service.ts
import { ScoreRepository } from '../repositories/score.repository.js';

export class ScoreService {
  private scoreRepository: ScoreRepository;

  constructor(scoreRepository: ScoreRepository) {
    this.scoreRepository = scoreRepository;
  }

  // 점수 추가
  async addScore(name: string, score: number) {
    return await this.scoreRepository.addScore(name, score);
  }

  // 점수 목록 조회
  async getScores() {
    return await this.scoreRepository.getScores();
  }
}
