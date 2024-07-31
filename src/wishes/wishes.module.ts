import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wish } from "./wishes.entity";
import { WishesController } from "./wishes.controller";
import { WishesService } from "./wishes.service";


@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [WishesService]
})
export class WishesModule {}