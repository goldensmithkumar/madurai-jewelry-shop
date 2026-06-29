const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function main() {
    try {
        console.log("Testing connection...");
        const user = await prisma.user.create({
            data: {
                email: "test_bot_" + Date.now() + "@madurai.com",
                passwordHash: "dummyhash",
                profile: {
                    create: {
                        fullName: "Test Bot",
                        role: "customer"
                    }
                }
            }
        });
        console.log("SUCCESS! Created user:", user);
    } catch (e) {
        console.error("PRISMA ERROR DETECTED:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
