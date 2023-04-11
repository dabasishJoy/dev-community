import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommentsModule } from './comments/comments.module';
import { DeveloperModule } from './developer/developer.module';
import { ExperienceModule } from './experience/experience.module';
import { PostsModule } from './posts/posts.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    DeveloperModule,
    PostsModule,
    CommentsModule,
    SkillsModule,
    ExperienceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
