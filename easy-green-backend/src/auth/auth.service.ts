/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}
  
    async validateUser(email: string, pass: string): Promise<any>{
        const user = await this.userService.findOne(email)
        if(user && await bcrypt.compare(pass, user.password)){
            const { password, ...result} = user;
            return result;
        }
        return null;

    }

    async login(user: any){
        const payload = { email: user.email, sub: user.userId};

        return {
            accessToken: this.jwtService.sign(payload, {expiresIn: '15m'}),
            refreshToken: this.jwtService.sign(payload, {expiresIn: '7d'})
        }
    }

    async refreshAccessToken(refreshToken: string){
        try {
            const payload = this.jwtService.verify(refreshToken);
            return{
                accessToken: this.jwtService.sign({ email: payload.email, sub: payload.sub}, {expiresIn: '15m'})
            }
        } catch (error) {
            throw new Error("Invalid refresh token");
        }
    
    }
}
 