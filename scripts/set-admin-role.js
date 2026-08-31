// One-off: promote an already-registered user to role "admin". Only ever
// updates an existing row — it deliberately won't create one, since that
// would need a properly bcrypt-hashed password to ever log in (register
// normally at /register first, then run this).
//
// Usage: DATABASE_URL="..." node scripts/set-admin-role.js someone@example.com

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/set-admin-role.js <email>');
    process.exitCode = 1;
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No user found with email "${email}". Register that account at /register first, then re-run this.`);
    process.exitCode = 1;
    return;
  }

  if (user.role === 'admin') {
    console.log(`${email} is already an admin — nothing to do.`);
    return;
  }

  const updated = await prisma.user.update({
    where: { email },
    data: { role: 'admin' },
  });

  console.log(`Promoted ${email}: role changed from "${user.role}" to "${updated.role}".`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
