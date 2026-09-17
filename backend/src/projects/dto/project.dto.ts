import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(255)
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase alphanumeric characters and hyphens'),
  description: z.string().min(1, 'Description is required').max(5000),
  tags: z.string().min(1, 'Tags are required').max(255),
  demoUrl: z.string().url('Must be a valid URL').optional().nullable(),
  githubUrl: z.string().url('Must be a valid URL').optional().nullable(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export class CreateProjectDto extends createZodDto(createProjectSchema) {}

export const updateProjectSchema = createProjectSchema.partial();
export class UpdateProjectDto extends createZodDto(updateProjectSchema) {}
