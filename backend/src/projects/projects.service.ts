import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(featuredOnly = false) {
    return this.prisma.project.findMany({
      where: featuredOnly ? { featured: true } : undefined,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
    });
    if (!project) {
      throw new NotFoundException(`Project with slug '${slug}' not found`);
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto) {
    const existing = await this.prisma.project.findUnique({
      where: { slug: createProjectDto.slug },
    });
    if (existing) {
      throw new ConflictException(`Project with slug '${createProjectDto.slug}' already exists`);
    }

    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id);

    if (updateProjectDto.slug) {
      const existing = await this.prisma.project.findUnique({
        where: { slug: updateProjectDto.slug },
      });
      if (existing && existing.id !== id) {
        throw new ConflictException(`Project with slug '${updateProjectDto.slug}' already exists`);
      }
    }

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
