import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { FindManyOptions, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(32);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    return this.userRepository.create({...createUserDto, password: hashedPassword});
  }

  async find(options: FindManyOptions<User>) {
    return this.userRepository.find(options);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException()
    }

    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOneBy({username});
    if (!user) {
      throw new NotFoundException()
    }

    return user;
  }

  async updateOne(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({username});
    if (!user) {
      throw new NotFoundException()
    }

    if (updateUserDto.password !== undefined) {
      const salt = await bcrypt.genSalt(32);
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);

      return this.userRepository.update({username}, {...updateUserDto, password: hashedPassword});
    }

    return this.userRepository.update({username}, updateUserDto);
  }

  async removeOne(username: string) {
    const user = await this.userRepository.findOneBy({username});
    if (!user) {
      throw new NotFoundException()
    }

    return this.userRepository.delete({username});
  }
}