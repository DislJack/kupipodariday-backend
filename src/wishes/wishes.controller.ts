import { Body, Controller, Post, Get, Param, Patch, Delete } from "@nestjs/common";
import { WishesService } from "./wishes.service";
import { createWishDto } from "./dto/create-wish.dto";
import { updateWishDto } from "./dto/update-wish.dto";


@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post('')
  async create(@Body() createWishDto: createWishDto) {
    return this.wishesService.create(createWishDto);
  }

  @Get('last')
  async getLastWish() {
    return this.wishesService.find()[0];
  }

  @Get('top')
  async getTopWish() {
    const wishes = await this.wishesService.find();
    return wishes[wishes.length - 1];
  }

  @Get(':wishId')
  async findOne(@Param('wishId') wishId: number) {
    return this.wishesService.findOne(wishId);
  }

  @Patch(':wishId')
  async updateOne(@Param('wishId') wishId: number, @Body() updateWishDto: updateWishDto) {
    return this.wishesService.updateOne(wishId, updateWishDto);
  }

  @Delete(':wishId')
  async removeOne(@Param('wishId') wishId: number) {
    return this.wishesService.removeOne(wishId);
  }

  @Post(':wishId/copy')
  async copyOne(@Param('wishId') wishId: number) {
    return this.wishesService.copyOne(wishId);
  }
}