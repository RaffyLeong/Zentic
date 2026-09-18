import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { mockProperties } from '../lib/mock-data';

const prisma = new PrismaClient();

async function main() {
  // Seed hidden test account
  const hashedPw = await bcrypt.hash('GUBeR8n$Gl', 12);
  await prisma.user.upsert({
    where: { email: 'abacus-dcae5767@example.com' },
    update: {},
    create: {
      email: 'abacus-dcae5767@example.com',
      name: 'Test Admin',
      password: hashedPw,
    },
  });

  // Seed properties
  for (const p of mockProperties) {
    const existing = await prisma.property.findFirst({
      where: { address: p.address, postcode: p.postcode },
    });
    if (!existing) {
      await prisma.property.create({ data: p });
    }
  }

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
