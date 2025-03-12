// import express, { Express, Request, Response } from 'express';
// import dotenv from 'dotenv';
// import HallOfFameRouter from './routes/hallOfFame.router';
// import SaveDataRouter from './routes/saveData.router';
// import PlaytimeRouter from './routes/playtime.router';
// import UserRouter from './routes/user.router';
// import GameRouter from './routes/game.router';
// // import RankingRouter from './routes/ranking.router';
// import AuthRouter from './routes/auth.router';
// import { register } from './utils/logger';
// import { logger } from './utils/logger';
// // import redisClient from './utils/redisClient';

// dotenv.config();

// const app: Express = express();
// const PORT = 3000;

// // app.get('/cache', async (req, res) => {
// //   const data = await redisClient.get('messege');
// //   res.json({ messege: data || '캐시된 데이터가 없습니다.' });
// // });

// // app.post('/cache', async (req, res) => {
// //   const { key, value } = req.body;
// //   await redisClient.set(key, value);
// //   res.json({ success: true });
// // });

// // 헬스체크 엔드포인트
// app.get('/health', (req: Request, res: Response) => {
//   res.status(200).json({ status: 'UP', message: 'Server is healthy' });
// });

// // 기본 엔드포인트
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello BE Server!');
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // 라우터 개별 등록
// app.use('/hall-of-fame', HallOfFameRouter);
// app.use('/users', UserRouter);
// app.use('/save-data', SaveDataRouter);
// app.use('/playtime', PlaytimeRouter);
// app.use('/games', GameRouter);
// // app.use('/rankings', RankingRouter);
// app.use('/auth', AuthRouter);

// app._router.stack.forEach((r: any) => {
//   if (r.route && r.route.path) {
//     console.log(`Registered Route: ${r.route.path}`);
//   }
// });

// // Expose Prometheus metrics
// app.get('/metrics', async (req: Request, res: Response) => {
//   res.set('Content-Type', register.contentType);
//   res.end(await register.metrics());
// });

// app.listen(PORT, '0.0.0.0', () => {
//   logger.info(`${PORT} 포트로 서버가 열어요!`);
//   console.log(PORT, '포트로 서버가 열렸어요!');
//   logger.info(`DATABASE_URL:, ${process.env.DATABASE_URL}`);
//   logger.info(`REDIS_HOST: ${process.env.REDIS_HOST}`);
//   logger.info(`REDIS_PORT: ${process.env.REDIS_PORT}`);
// });

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import UserRouter from './routes/user.router';
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
  res.send('Hello BE Jenkins Server!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 라우터 개별 등록
app.use('/users', UserRouter);

app._router.stack.forEach((r: any) => {
  if (r.route && r.route.path) {
    console.log(`Registered Route: ${r.route.path}`);
  }
});

// Expose Prometheus metrics
app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`${PORT} 포트로 서버가 열어요!`);
  console.log(PORT, '포트로 서버가 열렸어요!');
  logger.info(`DATABASE_URL:, ${process.env.DATABASE_URL}`);
  logger.info(`REDIS_HOST: ${process.env.REDIS_HOST}`);
  logger.info(`REDIS_PORT: ${process.env.REDIS_PORT}`);
});
