const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
    const passwordHash = await bcrypt.hash('admin123', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@madurai.com' },
        update: {},
        create: {
            email: 'admin@madurai.com',
            passwordHash,
            profile: {
                create: {
                    fullName: 'Shop Admin',
                    role: 'admin'
                }
            }
        }
    })

    console.log('✅ Admin account created!')
    console.log('   Email:    admin@madurai.com')
    console.log('   Password: admin123')
}

main()
    .catch(e => { console.error(e); process.exit(1) })
    .finally(() => prisma.$disconnect())
