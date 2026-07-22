import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing certificates to ensure clean seed state
  await prisma.certificate.deleteMany();

  const sampleCertificates = [
    {
      certificateNumber: 'CS-2026-0001',
      candidateName: 'Rahul Sharma',
      courseName: 'Full Stack Development',
      issueDate: new Date('2026-01-15T00:00:00.000Z'),
      completionDate: new Date('2026-04-15T00:00:00.000Z'),
      grade: 'A+',
      status: 'Verified' as const,
      certificateUrl: 'https://coreslashtechnologies.com/certificates/CS-2026-0001.pdf',
    },
    {
      certificateNumber: 'CS-2026-0002',
      candidateName: 'Priya Patil',
      courseName: 'React Development',
      issueDate: new Date('2026-02-10T00:00:00.000Z'),
      completionDate: new Date('2026-04-10T00:00:00.000Z'),
      grade: 'A',
      status: 'Verified' as const,
      certificateUrl: 'https://coreslashtechnologies.com/certificates/CS-2026-0002.pdf',
    },
    {
      certificateNumber: 'CS-2026-0003',
      candidateName: 'Amit Kumar',
      courseName: 'Python Programming',
      issueDate: new Date('2026-03-05T00:00:00.000Z'),
      completionDate: new Date('2026-05-05T00:00:00.000Z'),
      grade: 'B+',
      status: 'Verified' as const,
      certificateUrl: 'https://coreslashtechnologies.com/certificates/CS-2026-0003.pdf',
    },
    {
      certificateNumber: 'CS-2026-0004',
      candidateName: 'Sneha Desai',
      courseName: 'Artificial Intelligence',
      issueDate: new Date('2026-04-12T00:00:00.000Z'),
      completionDate: new Date('2026-07-12T00:00:00.000Z'),
      grade: 'A+',
      status: 'Verified' as const,
      certificateUrl: 'https://coreslashtechnologies.com/certificates/CS-2026-0004.pdf',
    },
    {
      certificateNumber: 'CS-2026-0005',
      candidateName: 'Rohan Kulkarni',
      courseName: 'Cloud Computing',
      issueDate: new Date('2026-05-20T00:00:00.000Z'),
      completionDate: new Date('2026-07-20T00:00:00.000Z'),
      grade: 'A',
      status: 'Verified' as const,
      certificateUrl: 'https://coreslashtechnologies.com/certificates/CS-2026-0005.pdf',
    },
    {
      certificateNumber: 'CS-2026-0006',
      candidateName: 'Priya Patil',
      courseName: 'Full Stack Development',
      issueDate: new Date('2026-06-01T00:00:00.000Z'),
      completionDate: new Date('2026-09-01T00:00:00.000Z'),
      grade: 'A+',
      status: 'Verified' as const,
      certificateUrl: 'https://coreslashtechnologies.com/certificates/CS-2026-0006.pdf',
    },
    {
      certificateNumber: 'CS-2026-0007',
      candidateName: 'Amit Kumar',
      courseName: 'React Development',
      issueDate: new Date('2026-06-15T00:00:00.000Z'),
      completionDate: new Date('2026-08-15T00:00:00.000Z'),
      grade: 'A',
      status: 'Verified' as const,
      certificateUrl: 'https://coreslashtechnologies.com/certificates/CS-2026-0007.pdf',
    },
    {
      certificateNumber: 'CS-2026-0008',
      candidateName: 'Rahul Sharma',
      courseName: 'Python Programming',
      issueDate: new Date('2026-07-01T00:00:00.000Z'),
      completionDate: null,
      grade: null,
      status: 'Verified' as const,
      certificateUrl: null,
    },
    {
      certificateNumber: 'CS-2026-0009',
      candidateName: 'Rohan Kulkarni',
      courseName: 'Artificial Intelligence',
      issueDate: new Date('2026-07-10T00:00:00.000Z'),
      completionDate: null,
      grade: null,
      status: 'Verified' as const,
      certificateUrl: null,
    },
    {
      certificateNumber: 'CS-2026-0010',
      candidateName: 'Sneha Desai',
      courseName: 'Cloud Computing',
      issueDate: new Date('2026-07-15T00:00:00.000Z'),
      completionDate: null,
      grade: null,
      status: 'Verified' as const,
      certificateUrl: null,
    },
  ];

  for (const cert of sampleCertificates) {
    await prisma.certificate.create({
      data: cert,
    });
  }

  console.log('10 sample certificates seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
