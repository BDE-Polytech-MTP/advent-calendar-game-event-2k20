import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      database: 'advent-scores',
      entities: [User],
      synchronize: true,
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
