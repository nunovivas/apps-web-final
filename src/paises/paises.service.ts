import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { Pais } from './entities/pais.entity';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private readonly paiseRepository: Repository<Pais>,
  ) {}
  async create(createPaiseDto: CreatePaisDto): Promise<Pais> {
    const paise = this.paiseRepository.create(createPaiseDto);
    return this.paiseRepository.save(paise);
  }

  findAll() {
    return `This action returns all paises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paise`;
  }

  update(id: number, updatePaisDto: UpdatePaisDto) {
    return `This action updates a #${id} paise`;
  }

  remove(id: number) {
    return `This action removes a #${id} paise`;
  }
}
