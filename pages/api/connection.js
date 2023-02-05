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
        const accessToken = await getAccessToken(code).catch((e) => {
            res.status(500).json({"data": e})
        })

        const steamId = await getUserSteamID(accessToken).catch((e) => {
            res.status(500).json({"data": e})
        })

        const promise1Out = await Promise.all([
            getUserId(accessToken),
            getGmodstoreID(steamId)
        ]).catch((e) => {
            res.status(500).json({"data": e})
        })

        const userId = promise1Out[0]
        const gmodstoreId = promise1Out[1]

        const gmodstorePurchases = await getGmodstorePurchases(gmodstoreId).catch((e) => {
            res.status(500).json({"data": e})
        })

        await givePulsarRoles(gmodstorePurchases, userId).then(() => {
            res.status(200).json({"data": "OK"})
        }).catch((e) => {
            res.status(500).json({"data": e})
        })
    } catch (e) {
        res.status(500).json({data: "Internal Server Error"})
    }
}

