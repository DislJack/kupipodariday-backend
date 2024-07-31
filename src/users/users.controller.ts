import { Body, Controller, Get, HttpException, NotFoundException, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtGuard } from "src/guards/jwt.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getUserInfo(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async updateUserInfo(@Req() req, updateUserDto: UpdateUserDto) {
    const user = req.user;
    if (!user) {
      throw new NotFoundException();
    }

    if (updateUserDto.password !== undefined) {
      const salt = await bcrypt.genSalt(32);
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);

      return this.usersService.updateOne(user.username, {...updateUserDto, password: hashedPassword})
    }

    return this.usersService.updateOne(user.username, updateUserDto);
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  async getAuthUserWishes(@Req() req) {
    return req.user.wishes;
  }

  @Get(':username/wishes')
  async getUserWishes(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException();
    }

    return user.wishes;
  }

  @Post('find')
  async findUsers(@Body() body) {
    const users = await this.usersService.find({where: body.username ? body.username : body.email});
    return users;
  }
}