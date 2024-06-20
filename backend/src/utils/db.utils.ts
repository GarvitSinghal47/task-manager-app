export const getDBConnectionconfig = (): any => {
  if (process.env.MODE === 'prod') {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
  console.log(process.env.POSTGRES_HOST, process.env.POSTGRES_PORT, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, process.env.POSTGRES_DB)

  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
};
