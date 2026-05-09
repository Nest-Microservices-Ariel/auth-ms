import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Implement 3 messagepattern 
  /*
    auth.register.user
    auth.login.user
    auth.verify.user

    se tienen que conetar al client-gateway pasando por nast y conectando con docker
   */


}
