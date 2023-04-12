import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
import { Developer, DeveloperSchema } from './schemas/developer.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'kjhakdfoeial4asd5f465e4asd54fa3e4aw5e4f5dasf4aew354fafe',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
    ]),
  ],
  controllers: [DeveloperController],
  providers: [DeveloperService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class DeveloperModule {}
