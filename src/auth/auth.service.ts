import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  auth(user: User) {
    const payload = {sub: user.id};
    console.log(payload);

    return {access_token: this.jwtService.sign(payload)}
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    const isEqual = await bcrypt.compare(password, user.password)
    if (user && (isEqual === true)) {
      const {password, email, ...result} = user;

      
      return result;
    }

    return null;
  }
}