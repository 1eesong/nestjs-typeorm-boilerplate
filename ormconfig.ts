import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { DbConfigService } from 'src/config/db/config.service';

const entity = join(__dirname, '/**/*.entity{.ts,.js}');
const migration = join(__dirname, './migrations/**/*{.ts,.js}');
const dbConfigService = new DbConfigService(new ConfigService());
// const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfigService.dbHost,
  port: dbConfigService.dbPort,
  username: dbConfigService.dbUser,
  password: dbConfigService.dbPassword,
  database: dbConfigService.dbName,

  //   host: configService.get<string>('DATABASE_HOST'),
  //   port: configService.get<number>('DATABASE_PORT'),
  //   username: configService.get<string>('DATABASE_USER'),
  //   password: configService.get<string>('DATABASE_PASSWORD'),
  //   database: configService.get<string>('DATABASE_NAME'),
  //   host: process.env.DATABASE_HOST,
  //   port: Number(process.env.DATABASE_PORT),
  //   username: process.env.DATABASE_USER,
  //   password: process.env.DATABASE_PASSWORD,
  //   database: process.env.DATABASE_NAME,
  // synchronize: true, // 마이그레이션 시 false
  entities: [entity],
  migrations: [migration],
});
