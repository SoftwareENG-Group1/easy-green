/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async create(CreateUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(CreateUserDto.password, salt);
        const user = this.userRepository.create({
            ...CreateUserDto,
            password: hashedPassword
        });
        if(!user) {
            throw new BadRequestException('User not created');
        }
        const savedUser = await this.userRepository.save(user);
        // remove password from the response
        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }
    async findOne(email: string): Promise<User | undefined>{
        return this.userRepository.findOne({where: { email }});
    }
}
