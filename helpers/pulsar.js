const axios = require("axios");
const ids = require("./ids.json")
const guild = process.env.PULSAR_GUILD
const accessToken = process.env.PULSAR_TOKEN

async function giveRole(roleId, userId) {
    return new Promise(async function (resolve, reject) {
        axios.put(`https://discord.com/api/v10/guilds/${guild}/members/${userId}/roles/${roleId}`, {}, {
            headers: {
                "Authorization": `Bot ${accessToken}`
            }
        }).then(() => resolve()).catch(() => reject("Unable to give role"))
    })
}

async function givePulsarRoles(purchases, userId) {
    return new Promise(async function (resolve, reject) {
        let customer = false
        await purchases.forEach(purchase => {
            const id = purchase.productId
            const roleId = ids[id]
            if (!roleId) return;
            giveRole(roleId, userId).catch(() => reject("Unable to give role"))
            customer = true
        })
        if (customer) {
            await giveRole(ids["customer"], userId).catch(() => reject("Unable to give customer role"))
        }
        resolve()
    })
}

module.exports = {
    givePulsarRoles,
    giveRole
}