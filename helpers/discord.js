const FormData = require("form-data");
const axios = require("axios");

async function getAccessToken(code) {
    const form = new FormData();
    form.append('client_id', process.env.DISCORD_CLIENT_ID)
    form.append("client_secret", process.env.DISCORD_CLIENT_SECRET)
    form.append("grant_type", "authorization_code")
    form.append("code", code)
    form.append("redirect_uri", process.env.DISCORD_REDIRECT_URI)

    try {
        return await axios.post('https://discord.com/api/v10/oauth2/token', form, {headers: form.getHeaders()})
    } catch {
        throw new Error("Invalid OAuth code.")
    }
}

async function getUserSteamID(accessToken) {
    try {
        const returnData = await axios.get('https://discord.com/api/v10/users/@me/connections', {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
        )

        const data = returnData.data
        const steamData = data.filter((connection) => connection.type === 'steam')
        if (!steamData || steamData.length === 0) {
            return new Error("Missing Steam account connection")
        }

        return steamData[0].id
    } catch {
        return new Error("Unable to fetch user connections")
    }
}

async function getUserId(accessToken) {
    try {
        const returnData = await axios.get('https://discord.com/api/v10/users/@me', {headers: {Authorization: `Bearer ${accessToken}`}})

        const data = returnData.data
        return data.id
    } catch {
        return new Error("Unable to fetch user data")
    }
}

module.exports = {
    getAccessToken,
    getUserSteamID,
    getUserId
}