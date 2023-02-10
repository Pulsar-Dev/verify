const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function addUserToDB(discordID, steamID, gmodstoreID) {
    try {
        console.log(`🔃 | Adding user to DB | Discord ID: ${discordID} | Steam ID: ${steamID} | Gmodstore ID: ${gmodstoreID}`)
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
        console.error(e)
        return new Error("Error adding user to DB")
    }

    await prisma.$disconnect()
}

async function fetchFromGmodstoreID(gmodstoreID) {
    try {
        console.log(`🔃 | Fetching user from DB | Gmodstore ID: ${gmodstoreID}`)
        const user = await prisma.users.findFirst({
            where: {
                gmodstoreID: gmodstoreID
            },
        })
        await prisma.$disconnect()
        return user
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()

    }
}

module.exports = {
    addUserToDB,
    fetchFromGmodstoreID
}