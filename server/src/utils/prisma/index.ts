import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
});

async function testConnection() {
  try {
    // 데이터베이스 연결 시도
    await prisma.$connect();
    console.log('Database connected successfully!');
  } catch (error: any) {
    // 연결 실패 시 오류 메시지
    console.log('Database connection failed: ' + error.message);
  }
}

// 연결 확인 함수 호출
testConnection();
