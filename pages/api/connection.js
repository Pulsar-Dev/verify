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
        console.time("getToken")
        const accessToken = await getAccessToken(code).catch((e) => {
            res.status(500).json({"data": e})
        })
        console.timeEnd("getToken")

        console.time("getUserSteamId")
        const steamId = await getUserSteamID(accessToken).catch((e) => {
            res.status(500).json({"data": e})
        })
        console.timeEnd("getUserSteamId")

        console.time("getDiscUserId")
        const userId = await getUserId(accessToken).catch((e) => {
            res.status(500).json({"data": e})
        })
        console.timeEnd("getDiscUserId")

        console.time("getGMSUserId")
        const gmodstoreId = await getGmodstoreID(steamId).catch((e) => {
            res.status(500).json({"data": e})
        })
        console.timeEnd("getGMSUserId")

        console.time("getPurchases")
        const gmodstorePurchases = await getGmodstorePurchases(gmodstoreId).catch((e) => {
            res.status(500).json({"data": e})
        })
        console.timeEnd("getPurchases")

        console.time("giveRoles")
        await givePulsarRoles(gmodstorePurchases, userId).then(() => {
            res.status(200).json({"data": "OK"})
        }).catch((e) => {
            res.status(500).json({"data": e})
        })
        console.timeEnd("giveRoles")


    } catch (e) {
        res.status(500).json({data: "Internal Server Error"})
    }
}

