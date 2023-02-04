import {getAccessToken, getUserId, getUserSteamID} from "@/helpers/discord";
import {getGmodstoreID, getGmodstorePurchases} from "@/helpers/gmodstore";
import {givePulsarRoles} from "@/helpers/pulsar";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(500).json({error: 'Invalid method'})
        return
    }
    const code = req.query.code || null

    if (!code) {
        res.status(500).json({error: 'Missing code'})
        return
    }
    try {
        const accessToken = await getAccessToken(code)

        const steamId = await getUserSteamID(accessToken)

        const promise1 = Promise.all([
            getUserId(accessToken),
            getGmodstoreID(steamId)
        ])

        const promise1Out = await promise1
        const userId = promise1Out[0]
        const gmodstoreId = promise1Out[1]

        const gmodstorePurchases = await getGmodstorePurchases(gmodstoreId)

        await givePulsarRoles(gmodstorePurchases, userId)

        res.status(200).json({"data": "OK"})
    } catch (e) {
        res.status(500).json({error: "Internal Server Error"})
    }
}

