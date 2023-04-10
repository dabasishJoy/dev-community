import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsController } from './skills.controller';
import { Skills, SkillsSchema } from './skills.model';
import { SkillsService } from './skills.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skills.name, schema: SkillsSchema }]),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
