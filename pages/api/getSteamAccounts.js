import {getAccessToken} from "@/helpers/discord";
import {getUser, getUserSteamAccounts} from "@helpers/discord";

let returnedData = false

async function returnData(res, status, data) {
    if (returnedData) return;
    returnedData = true
    res.status(status).json({data: data})
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        await returnData(res, 405, "Invalid Method")
        return
    }
    const code = req.query.code || null

    if (!code) {
        await returnData(res, 500, "Missing code! Please try again.")
        return
    }

    const catcher = async (e) => {
        await returnData(res, 500, e)
    }

    const accessToken = await getAccessToken(code).catch(catcher)
    if (!accessToken) {
        await returnData(res, 404, "Unable to get access token")
        return
    }

    const steamAccounts = await getUserSteamAccounts(accessToken).catch(catcher)
    if (!steamAccounts) {
        await returnData(res, 404, "No Steam Accounts Found")
        return
    }

    const user = await getUser(accessToken).catch(catcher)
    if (!user) {
        await returnData(res, 404, "Unable to find Discord user")
        return
    }

    const data = {
        user: user,
        steamAccounts: steamAccounts
    }

    res.status(200).json(data)

}

