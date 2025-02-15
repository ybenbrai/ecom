// src/controllers/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Controller() // This ensures the controller is not prefixed with /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // This defines the POST route for /login
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.validateUser(email, password);
  }
}
