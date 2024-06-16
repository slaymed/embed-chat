import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import { CreateSiteParams, UpdateSiteParams } from './site.types';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site)
    private readonly sitesRepository: Repository<Site>,
  ) {}

  findAll(options: FindManyOptions<Site>): Promise<Site[]> {
    return this.sitesRepository.find(options);
  }

  count(options?: FindManyOptions<Site>): Promise<number> {
    return this.sitesRepository.count(options);
  }

  findOne(options: FindOneOptions<Site>): Promise<Site | null> {
    return this.sitesRepository.findOne(options);
  }

  findUnique(domain: string, ownerId: number): Promise<Site | null> {
    return this.sitesRepository.findOne({
      where: {
        domain,
        ownerId,
      },
    });
  }

  async findOneOrFail(options: FindOneOptions<Site>): Promise<Site> {
    const user = await this.findOne(options);
    if (!user) {
      throw new NotFoundException('Site not found');
    }
    return user;
  }

  async findUniqueOrFail(domain: string, ownerId: number): Promise<Site> {
    const user = await this.findUnique(domain, ownerId);
    if (!user) {
      throw new NotFoundException('Site not found');
    }
    return user;
  }

  async create(params: CreateSiteParams): Promise<Site> {
    const emailTaken = await this.findOne({
      where: {
        domain: params.domain,
        ownerId: params.ownerId,
      },
    });
    if (emailTaken) {
      throw new ConflictException('Site already exist');
    }
    const createdSite = this.sitesRepository.create(params);
    return this.sitesRepository.save(createdSite);
  }

  async updateOne(
    site: number | Site,
    params: UpdateSiteParams,
  ): Promise<Site> {
    if (typeof site === 'number') {
      site = await this.findOneOrFail({
        where: {
          id: site,
        },
      });
    }

    return this.sitesRepository.save(Object.assign(site, params));
  }

  delete(where: FindOptionsWhere<Site>): Promise<DeleteResult> {
    return this.sitesRepository.delete(where);
  }
}
