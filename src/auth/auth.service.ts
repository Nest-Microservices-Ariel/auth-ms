import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';
import { PrismaService } from 'src/config/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService'); 

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ){}

  async singJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }


  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, name, password } = registerUserDto;
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email }
      });

      if (user) {
        throw new BadRequestException('User already exists!');
      }

      console.log({ registerUserDto });

      const {password:_, ...newUser} = await this.prismaService.user.create({
        data: {
          email,
          name,
          password: bcrypt.hashSync(password, 10)
        }
      });

      return {
        user: newUser,
        toke: await this.singJWT(newUser)
      };

    } catch (error: unknown) {
      this.getError(error)
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email }
      });

      if(!user) {
        throw new BadRequestException('Invalid Credentials!');
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if(!matchPassword) {
        throw new BadRequestException('Invalid Credentials!');
      }

      const {password: _, ...rest} = user;

      return {
        user: { ...rest },
        token: await this.singJWT(rest)
      }

    } catch (error) {
      this.getError(error);
    }
  }

  private getError(error: unknown) {
    if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message:
          typeof error === 'string'
            ? error
            : error instanceof Error
            ? error.message
            : error ?? 'Internal server error',
      });
  }
}
