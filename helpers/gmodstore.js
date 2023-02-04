const axios = require("axios");
const accessToken = "961575cf-5be2-4ec5-9239-9c0c80252423|fZyDM5VblBdbTjXquqjpGKxDAGxyt7nO5OwLG9cb"

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
        }).catch(err => {
            reject(err)
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
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    getGmodstoreID,
    getGmodstorePurchases
}