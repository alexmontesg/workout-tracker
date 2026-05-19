export default () => ({
  port: parseInt(process.env.API_PORT ?? '3001', 10),
  database: {
    path: process.env.DATABASE_PATH ?? 'data/database.sqlite',
    synchronize: process.env.DB_SYNCHRONIZE !== 'false',
  },
  cors: {
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  },
});
