import axios from "axios";
import FormData from "form-data";

const config = (accessToken) => {
    return {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    }
}

async function getAccessToken(code) {
    const form = new FormData();
    form.append('client_id', process.env.DISCORD_CLIENT_ID)
    form.append("client_secret", process.env.DISCORD_CLIENT_SECRET)
    form.append("grant_type", "authorization_code")
    form.append("code", code)
    form.append("redirect_uri", process.env.DISCORD_REDIRECT_URI)

    try {
        console.log("🔃 | Getting access token from Discord API")
        const returnData = await axios.post('https://discord.com/api/v10/oauth2/token', form, {headers: form.getHeaders()})

        if (returnData.status !== 200) {
            throw new Error("Invalid OAuth code.")
        }

        return returnData.data.access_token

    } catch (e) {
        throw new Error("Invalid OAuth code.")
    }
}

async function getUserSteamAccounts(accessToken) {
    try {
        console.log("🔃 | Getting steam accounts from Discord API")
        const returnData = await axios.get('https://discord.com/api/v10/users/@me/connections', config(accessToken))

        if (returnData.status !== 200) {
            return new Error("Unable to fetch user connections")
        }

        const data = returnData.data
        const steamData = data.filter((connection) => connection.type === 'steam')
        if (!steamData || steamData.length === 0) {
            return new Error("Missing Steam account connection")
        }

        return steamData
    } catch (e) {
        return new Error("Unable to fetch user connections")
    }
}

async function getUser(accessToken) {
    try {
        console.log("🔃 | Getting user ID from Discord API")
        const returnData = await axios.get('https://discord.com/api/v10/users/@me', config(accessToken))

        if (returnData.status !== 200) {
            return new Error("Unable to fetch user data")
        }

        return returnData.data
    } catch (e) {
        console.error(e)
        return new Error("Unable to fetch user data")
    }
}

module.exports = {
    getAccessToken,
    getUserSteamAccounts,
    getUser
}