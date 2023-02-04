const FormData = require("form-data");
const axios = require("axios");

async function getAccessToken(code) {
    return new Promise(function (resolve, reject) {
        const form = new FormData();
        form.append('client_id', process.env.DISCORD_CLIENT_ID)
        form.append("client_secret", process.env.DISCORD_CLIENT_SECRET)
        form.append("grant_type", "authorization_code")
        form.append("code", code)
        form.append("redirect_uri", process.env.DISCORD_REDIRECT_URI)

     axios.post('https://discord.com/api/v10/oauth2/token', form, {headers: form.getHeaders()}).then(res => {
            const accessToken = res.data.access_token

            resolve(accessToken)
        }).catch(err => {
            reject(err)
        })

    })
}

async function getUserSteamID(accessToken) {
    return new Promise(async function (resolve, reject) {
        axios.get('https://discord.com/api/v10/users/@me/connections', {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then(async res => {
            const data = res.data
            const steamData = data.filter((connection) => connection.type === 'steam')
            if (!steamData || steamData.length === 0) {
                reject('No Steam Account Found')
            }

            const steamId = steamData[0].id
            resolve(steamId)

        }).catch(err => {
            reject(err)
        })
    })
}

async function getUserId(accessToken) {
    return new Promise(async function (resolve, reject) {
        axios.get('https://discord.com/api/v10/users/@me', {headers: {Authorization: `Bearer ${accessToken}`}}).then(res => {
            const data = res.data
            const id = data.id
            resolve(id)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    getAccessToken,
    getUserSteamID,
    getUserId
}