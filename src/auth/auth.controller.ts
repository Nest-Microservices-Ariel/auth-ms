import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * foo.* matches foo.bar, boo.baz, and so on, but not foo.bar.baz
   * foo.*.bar matches foo.baz.bar, foo.qux.bar, and so on, buy foo.bar or foo.bar.baz
   * foo.> matches foo.bar, foo.bar.baz, and so on
   */

  @MessagePattern('auth.register.user')
  async authRegister(@Payload() user: any) {
    return user;
  }

  @MessagePattern('auth.login.user')
  async authLogin(@Payload() user: any) {
    return user;
  }

  @MessagePattern('auth.verify.user')
  async userVerify(@Payload() user: any) {
    return user;
  }
}
