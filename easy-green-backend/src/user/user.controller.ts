import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<Omit <User, 'password'>> {
        return this.userService.create(createUserDto);
    }
}
