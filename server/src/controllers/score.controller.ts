// controllers/score.controller.ts
import { Request, Response } from 'express';
import { ScoreService } from '../services/score.service';
import { logger } from '../utils/logger';

export class ScoreController {
  private scoreService: ScoreService;

  constructor(scoreService: ScoreService) {
    this.scoreService = scoreService;
  }

  // 점수 추가
  async addScore(req: Request, res: Response) {
    const { name, score } = req.body;

    logger.info(`POST /score - Request Body: ${JSON.stringify(req.body)}`);

    if (typeof name === 'string' && typeof score === 'number') {
      const addedScore = await this.scoreService.addScore(name, score);

      logger.info(
        `Response: ${JSON.stringify({ message: 'Score added successfully', score: addedScore })}`,
      );

      return res.status(201).json({ message: 'Score added successfully', score: addedScore });
    }
    logger.warn('Invalid input received for POST /score');
    return res.status(400).json({ message: 'Invalid input!' });
  }

  // 점수 목록 조회
  async getScores(req: Request, res: Response) {
    logger.info('GET /scores - Fetching all scores');
    const scores = await this.scoreService.getScores();

    logger.info(`Response: ${JSON.stringify(scores)}`);
    return res.status(200).json(scores);
  }
}
