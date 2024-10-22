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
    private readonly paisRepository: Repository<Pais>,
  ) {}
  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
    const pais = this.paisRepository.create(createPaisDto);
    return this.paisRepository.save(pais);
  }

  async findAll(): Promise<Pais[]> {
    return this.paisRepository.find();
  }

  async findOne(id: number): Promise<Pais> {
    return this.paisRepository.findOneBy({ id });
  }

  async findAllByMembroUN(membroUN: boolean): Promise<Pais[]> {
    console.log(membroUN);
    return this.paisRepository.find({ where: { membroUN } });
  }

  async update(id: number, updatePaisDto: UpdatePaisDto): Promise<void> {
    await this.paisRepository.update(id, updatePaisDto);
  }

  async remove(id: number): Promise<void> {
    await this.paisRepository.delete(id);
  }

  async removeAll(): Promise<void> {
    await this.paisRepository.clear();
  }
}
