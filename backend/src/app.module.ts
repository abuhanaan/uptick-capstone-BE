import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { JobsModule } from './jobs/jobs.module';
import { ProgramsModule } from './programs/programs.module';
import { TagsModule } from './tags/tags.module';
import { ContactusModule } from './contactus/contactus.module';
import { ApplicationsModule } from './applications/applications.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PostsModule,
    JobsModule,
    ProgramsModule,
    TagsModule,
    ContactusModule,
    ApplicationsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
