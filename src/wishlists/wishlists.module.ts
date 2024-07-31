import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wishlist } from "./wishlists.entity";
import { WishlistsController } from "./wishlists.controller";
import { WishlistsService } from "./wishlists.service";


@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  controllers: [WishlistsController],
  providers: [WishlistsService]
})
export class WishlistsModule {}