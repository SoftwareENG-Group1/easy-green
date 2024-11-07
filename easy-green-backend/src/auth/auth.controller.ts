/* eslint-disable prettier/prettier */
import { Controller, Request, Post, UseGuards, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login to get a JWT token' })
  @ApiBody({ schema: { example: { email: 'user@example.com', password: 'password123' } } }) // Example request body
  @ApiResponse({ status: 201, description: 'Login successful, returns a JWT token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @ApiOperation({summary: 'Refresh access token using refresh token'})
  @ApiBody({schema: {example: {refreshToken: 'your_refresh_token_here'}}})
  @ApiResponse({ status: 201, description: 'New access token generated' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body() body: {refreshToken: string}){
    try{
      const newAccessToken = await this.authService.refreshAccessToken(body.refreshToken);
      return newAccessToken
    }catch(error){
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('logout')
  // async logout(@Request() req){
  //   return req.user;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req){
  //   return req.user;
  // }
}
