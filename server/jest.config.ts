import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src';
const baseTestDir = '<rootDir>/src/test';

// 빈 중괄호 사이에 커서를 두고 ctrl+space 하면 옵션들을 볼 수 있다
const config: Config.InitialOptions = {
  preset: 'ts-jest', // jest가 ts를 이해할 수 있도록 하는 사전세팅
  testEnvironment: 'node', // node 환경을 테스트
  verbose: true, // 테스트 결과를 자세히 출력
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.ts`],
};

export default config;
