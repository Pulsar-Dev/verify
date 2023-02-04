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
        }).then(r => resolve()).catch(err => reject(err))
    })
}

async function givePulsarRoles(purchases, userId) {
    return new Promise(async function (resolve, reject) {
        let customer = false
        await purchases.forEach(purchase => {
            const id = purchase.productId
            const roleId = ids[id]
            if (!roleId) return;
            giveRole(roleId, userId).catch(err => reject(err))
            customer = true
        })
        if (customer) {
            await giveRole(ids["customer"], userId).catch(err => reject(err))
        }
        resolve()
    })
}

module.exports = {
    givePulsarRoles
}