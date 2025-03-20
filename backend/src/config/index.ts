import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3000,
  testServerUrl: process.env.TEST_SERVER_URL || 'http://20.244.56.144/test',
  refreshIntervalMs: Number(process.env.REFRESH_INTERVAL) || 30000,
  requestTimeoutMs: 5000,
  accessToken: process.env.ACCESS_TOKEN || 'default-token',
};