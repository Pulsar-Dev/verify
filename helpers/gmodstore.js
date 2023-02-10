import axios from "./axios";
const accessToken = process.env.GMODSTORE_TOKEN;

async function getGmodstoreID(steamId) {
    try {
        console.log("🔃 | Getting Gmodstore UUID from Gmodstore API")
        const returnData = await axios.get(`https://www.gmodstore.com/api/v3/users?filter[steamId]=${steamId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        const data = returnData.data
        return data.data[0].id
    } catch (e) {
        console.error(e)
        return new Error("GModStore API returned error when fetching ID")
    }
}

async function getGmodstorePurchases(gmodstoreId) {
    try {
        console.log("🔃 | Getting Gmodstore purchases from Gmodstore API")
        const returnData = await axios.get(`https://www.gmodstore.com/api/v3/users/${gmodstoreId}/purchases`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        const data = returnData.data
        return data.data
    } catch (e) {
        console.error(e)
        return new Error("Unable to fetch purchases from GModStore API")
    }
}

module.exports = {
    getGmodstoreID,
    getGmodstorePurchases
}