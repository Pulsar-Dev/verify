const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


async function addUserToDB(discordID, steamID, gmodstoreID) {
    try {
        await prisma.users.upsert({
            where: {
                discordID: discordID
            },
            create: {
                discordID: discordID,
                steamID: steamID,
                gmodstoreID: gmodstoreID
            },
            update: {
                discordID: discordID,
                steamID: steamID,
                gmodstoreID: gmodstoreID
            }
        })
    } catch (e) {
        return new Error("Error adding user to DB")
    }

    await prisma.$disconnect()
}

async function fetchFromGmodstoreID(gmodstoreID) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                gmodstoreID: gmodstoreID
            },
        })
        await prisma.$disconnect()
        return user
    } catch {
        await prisma.$disconnect()

    }
}

module.exports = {
    addUserToDB,
    fetchFromGmodstoreID
}