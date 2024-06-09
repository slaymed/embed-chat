import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { SessionPayload } from '../auth.types';
import { User } from 'src/user/entities/user.entity';

type SerializeCallback = (err: Error, payload: SessionPayload) => void;
type DeserializeCallback = (err: Error, user: User) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: any, done: SerializeCallback) {
    done(null, { id: user.id });
  }

  async deserializeUser(payload: SessionPayload, done: DeserializeCallback) {
    const user = await this.userService.findOne({
      where: {
        id: payload.id,
      },
    });
    done(null, user);
  }
}
