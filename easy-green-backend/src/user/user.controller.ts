/* eslint-disable prettier/prettier */
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<Omit <User, 'password'>> {
        return this.userService.create(createUserDto);
    }

    // @UseGuards(JwtAuthGuard)
    // @Get('profile')
    // getProfile(@Request() req){
    //     return req.user;
    // }
}
