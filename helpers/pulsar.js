import axios from "./axios";
import ids from "./ids.json";
const guild = process.env.PULSAR_GUILD
const accessToken = process.env.PULSAR_TOKEN

async function giveRole(roleId, userId) {
    try {
        await axios.put(`https://discord.com/api/v10/guilds/${guild}/members/${userId}/roles/${roleId}`, {}, {
            headers: {
                "Authorization": `Bot ${accessToken}`
            }
        })
    } catch (e) {
        console.error(e)
        return new Error("Unable to give role")
    }
}

async function givePulsarRoles(purchases, userId) {
    let customer = false
    await purchases.forEach(purchase => {
        const id = purchase.productId
        const roleId = ids[id]
        if (!roleId) return;
        try {
            giveRole(ids["customer"], userId)
        } catch (e) {
            console.error(e)
            return new Error("Unable to give customer role")
        }
        customer = true
    })
    if (customer) {
        try {
            await giveRole(ids["customer"], userId)
        } catch (e) {
            console.error(e)
            return new Error("Unable to give customer role")
        }
    }
}

module.exports = {
    givePulsarRoles,
    giveRole
}