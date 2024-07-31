import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { WishlistsService } from "./wishlists.service";
import { createWishlistDto } from "./dto/create-wishlist.dto";
import { updateWishlistDto } from "./dto/update-wishlist.dto";

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistService: WishlistsService) {}

  @Get('')
  async findAll() {
    return this.wishlistService.findAll();
  }

  @Post('')
  async create(@Body() createWishlistDto: createWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.wishlistService.findOne(id);
  }

  @Delete(':id')
  async removeOne(@Param('id') id: number) {
    return this.wishlistService.removeOne(id);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: number, @Body() updateWishlistDto: updateWishlistDto) {
    return this.wishlistService.updateOne(id, updateWishlistDto);
  }
}