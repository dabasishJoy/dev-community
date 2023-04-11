import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/developer/interfaces/jwt-payload.interface';
import { DeveloperService } from '../developer/developer.service';
import { Developer } from '../developer/schemas/developer.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly developerService: DeveloperService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'kjhakdfoeial4asd5f465e4asd54fa3e4aw5e4f5dasf4aew354fafe',
    });
  }

  async validate(payload: JwtPayload): Promise<Developer> {
    const developer: Developer = await this.developerService.findOneById(
      payload.userId,
    );
    if (!developer) {
      throw new UnauthorizedException();
    }
    return developer;
  }
}