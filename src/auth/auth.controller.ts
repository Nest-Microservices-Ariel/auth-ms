import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
