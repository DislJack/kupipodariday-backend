import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wish } from "./wishes.entity";
import { Repository } from "typeorm";
import { updateWishDto } from "./dto/update-wish.dto";
import { createWishDto } from "./dto/create-wish.dto";


@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async find() {
    return this.wishRepository.find();
  }

  async create(createWishDto: createWishDto) {
    return this.wishRepository.create(createWishDto);
  }

  async findOne(id: number) {
    const wish = await this.wishRepository.findOneBy({id})
    if (!wish) {
      throw new NotFoundException();
    }

    return wish;
  }

  async updateOne(id: number, updateWishDto: updateWishDto) {
    const wish = await this.wishRepository.findOneBy({id});
    if (!wish) {
      throw new NotFoundException()
    }

    return this.wishRepository.update({id}, updateWishDto);
  }

  async removeOne(id: number) {
    const wish = await this.wishRepository.findOneBy({id});
    if (!wish) {
      throw new NotFoundException()
    }

    return this.wishRepository.delete({id});
  }

  async copyOne(id: number) {
    const wish = await this.wishRepository.findOneBy({id});
    if (!wish) {
      throw new NotFoundException();
    }

    return this.wishRepository.update({id}, {copied: wish.copied + 1})
  }
}