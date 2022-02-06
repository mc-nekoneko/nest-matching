import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { loggingMiddleware } from './middlewares/logging.middleware';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
