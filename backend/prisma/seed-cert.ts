import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.certificate.upsert({
    where: { certificateId: 'CST2026-0001' },
    update: {},
    create: {
      certificateId: 'CST2026-0001',
      studentName: 'John Doe',
      courseName: 'Full Stack Development',
      issueDate: new Date('2026-07-15T00:00:00.000Z'),
      status: 'VALID',
    },
  });
  console.log('Test certificate seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
