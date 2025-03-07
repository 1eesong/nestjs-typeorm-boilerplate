import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ErrorHandlingMiddleware } from './middlewares/error-handling.middleware';
import { DbConfigModule } from './config/db/config.module';
import { DbConfigService } from './config/db/config.service';
import { join } from 'path';
import { AppConfigModule } from './config/app/config.module';
import { S3Module } from './modules/s3/s3.module';
import { PostsModule } from './modules/posts/posts.module';
import { AppDataSource } from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    UsersModule,
    S3Module,
    PostsModule,
    // DbConfigModule,
    // AppConfigModule,
    // AwsConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorHandlingMiddleware).forRoutes('*');
  }
}
