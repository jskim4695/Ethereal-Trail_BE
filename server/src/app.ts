import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import ScoreRouter from './routes/score.router';
import { register } from './utils/logger';
import { logger } from './utils/logger';

dotenv.config();

const app: Express = express();
const PORT = 3000;

// 헬스체크 엔드포인트
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});

// 기본 엔드포인트
app.get('/', (req: Request, res: Response) => {
  res.send('Hello BE Server!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', [ScoreRouter]);

// Expose Prometheus metrics
app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  logger.info(`${PORT} 포트로 서버가 열렸어요!`);
  console.log(PORT, '포트로 서버가 열렸어요!');
});
