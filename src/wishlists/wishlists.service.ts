import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wishlist } from "./wishlists.entity";
import { Repository } from "typeorm";


@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: any) {
    return this.wishlistRepository.create(createWishlistDto)
  }

  async findAll() {
    return this.wishlistRepository.find()
  }

  async findOne(wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOneBy({id: wishlistId})
    if (wishlist.id !== wishlistId) {
      throw new NotFoundException()
    }

    return wishlist;
  }

  async updateOne(wishlistId: number, updateWishlistDto: any) {
    const wishlist = await this.wishlistRepository.findOneBy({id: wishlistId})
    if (wishlist.id !== wishlistId) {
      throw new NotFoundException()
    }
    return this.wishlistRepository.update({id: wishlistId}, updateWishlistDto)
  }

  async removeOne(wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOneBy({id: wishlistId})
    if (wishlist.id !== wishlistId) {
      throw new NotFoundException()
    }
    return this.wishlistRepository.delete({id: wishlistId});
  }
}