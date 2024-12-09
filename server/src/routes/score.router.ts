import express, { Request, Response } from 'express';
import { ScoreController } from '../controllers/score.controller';
import { ScoreService } from '../services/score.service';
import { ScoreRepository } from '../repositories/score.repository';

const router = express.Router();

// 의존성 주입
const scoreRepository = new ScoreRepository();
const scoreService = new ScoreService(scoreRepository);
const scoreController = new ScoreController(scoreService);

// POST 요청: 점수 추가
router.post('/score', async (req: Request, res: Response) => {
  await scoreController.addScore(req, res);
});

// GET 요청: 점수 목록 가져오기
router.get('/scores', async (req: Request, res: Response) => {
  await scoreController.getScores(req, res);
});

export default router;
