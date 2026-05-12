import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * foo.* matches foo.bar, boo.baz, and so on, but not foo.bar.baz
   * foo.*.bar matches foo.baz.bar, foo.qux.bar, and so on, buy foo.bar or foo.bar.baz
   * foo.> matches foo.bar, foo.bar.baz, and so on
   */

  @MessagePattern('auth.register.user')
  async authRegister(@Payload() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto)
  }

  @MessagePattern('auth.login.user')
  async authLogin(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @MessagePattern('auth.verify.user')
  async userVerify(@Payload() user: any) {
    return user;
  }
}
