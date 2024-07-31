import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { createOfferDto } from "./dto/create-offer.dto";


@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get('')
  async find() {
    return this.offersService.find();
  }

  @Post('')
  async create(@Body() createOfferDto: createOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Get(':offerId')
  async findOne(@Param('offerId') offerId: number) {
    return this.offersService.findOne(offerId);
  }
}