import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Upsert sample user
  const user = await prisma.user.upsert({
    where: { email: 'supun@example.com' },
    update: {},
    create: {
      email: 'supun@example.com',
      name: 'Supun Batagoda',
      role: 'ADMIN',
    },
  });

  console.log(`Upserted user: ${user.name} (${user.email})`);

  // Sample projects
  const sampleProjects = [
    {
      title: 'Nuxt 4 Portfolio Boilerplate',
      slug: 'nuxt-4-portfolio-boilerplate',
      description:
        'A production-grade boilerplate featuring Nuxt 4, Vue 3, Nuxt UI, Tailwind CSS, Pinia, NestJS, and MySQL 8.4 with Prisma.',
      tags: 'Nuxt,Vue,TypeScript,Tailwind,NestJS,Prisma,MySQL',
      demoUrl: 'https://github.com/supunbatagoda/supun-batagoda-portfolio',
      githubUrl: 'https://github.com/supunbatagoda/supun-batagoda-portfolio',
      featured: true,
      order: 1,
    },
    {
      title: 'Realtime Analytics Platform',
      slug: 'realtime-analytics-platform',
      description:
        'Distributed event streaming and real-time visualization platform built with modern TypeScript microservices.',
      tags: 'TypeScript,NestJS,Redis,WebSockets,Tailwind',
      demoUrl: null,
      githubUrl: 'https://github.com/supunbatagoda',
      featured: true,
      order: 2,
    },
  ];

  for (const project of sampleProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
    console.log(`Upserted project: ${project.title}`);
  }

  console.log('Database seeding finished.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
