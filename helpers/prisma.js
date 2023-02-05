const { PrismaClient } = require('@prisma/client')
const axios = require("axios");
const prisma = new PrismaClient()


async function addUserToDB(discordID, steamID, gmodstoreID) {
    return new Promise(async function (resolve, reject) {
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
        }).catch((e) => {
            console.log(e)
            reject("Error adding user to database")
        })

        await prisma.$disconnect()
        resolve()
    })
}

async function fetchFromGmodstoreID(gmodstoreID) {
    return new Promise(async function (resolve, reject) {
        const user = await prisma.users.findFirst({
            where: {
                gmodstoreID: gmodstoreID
            },
        }).catch((e) => {
            console.log(e)
            reject("Error fetching from DB")
        })

        await prisma.$disconnect()
        resolve(user)
    })
}

module.exports = {
    addUserToDB,
    fetchFromGmodstoreID
}