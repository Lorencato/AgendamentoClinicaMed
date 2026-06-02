import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('usuarios')
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('usuarios/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authService.remove(id);
  }
}