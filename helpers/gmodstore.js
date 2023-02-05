const axios = require("axios");
const accessToken = process.env.GMODSTORE_TOKEN;

async function getGmodstoreID(steamId) {
    return new Promise(async function (resolve, reject) {
        axios.get(`https://www.gmodstore.com/api/v3/users?filter[steamId]=${steamId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then(res => {
            const data = res.data
            const id = data.data[0].id
            resolve(id)
        }).catch(() => {
            reject("GModStore API returned error when fetching ID")
        })
    })
}

async function getGmodstorePurchases(gmodstoreId) {
    return new Promise(async function (resolve, reject) {
        axios.get(`https://www.gmodstore.com/api/v3/users/${gmodstoreId}/purchases`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then(res => {
            const data = res.data
            const purchases = data.data
            resolve(purchases)
        }).catch(() => {
            reject("Unable to fetch purchases from GModStore API")
        })
    })
}

module.exports = {
    getGmodstoreID,
    getGmodstorePurchases
}