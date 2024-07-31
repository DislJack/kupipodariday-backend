import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Offer } from "./offers.entity";
import { Repository } from "typeorm";
import { createOfferDto } from "./dto/create-offer.dto";
import { updateOfferDto } from "./dto/update-offer.dto";


@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>
  ) {}

  async find() {
    return this.offerRepository.find();
  }

  async create(createOfferDto: createOfferDto) {
    return this.offerRepository.create(createOfferDto);
  }

  async findOne(id: number) {
    const offer = await this.offerRepository.findOneBy({id});
    if (!offer) {
      return new NotFoundException()
    }
    
    return offer;
  }

  async updateOne(id: number, updateOfferDto: updateOfferDto) {
    const offer = await this.offerRepository.findOneBy({id});
    if (!offer) {
      return new NotFoundException()
    }

    return this.offerRepository.update({id}, updateOfferDto);
  }

  async removeOne(id: number) {
    const offer = await this.offerRepository.findOneBy({id});
    if (!offer) {
      return new NotFoundException()
    }

    return this.offerRepository.delete({id});
  }
}