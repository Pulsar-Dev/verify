import {getAccessToken, getUserId, getUserSteamID} from "@/helpers/discord";
import {getGmodstoreID, getGmodstorePurchases} from "@/helpers/gmodstore";
import {givePulsarRoles} from "@/helpers/pulsar";

const catcher = (res) => {
    res.status(500).json({error: 'Internal Server Error'})
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(400).json({error: 'Invalid method'})
        return
    }

    const code = req.query.code || null

    if (!code) {
        res.status(400).json({error: 'Missing code'})
        return
    }


    const accessToken = await getAccessToken(code).catch(err => catcher)
    const steamId = await getUserSteamID(accessToken).catch(err => catcher)

    const promise1 = Promise.all([
        getUserId(accessToken),
        getGmodstoreID(steamId)
    ]).catch(err => catcher)

    const promise1Out = await promise1
    const userId = promise1Out[0]
    const gmodstoreId = promise1Out[1]

    const gmodstorePurchases = await getGmodstorePurchases(gmodstoreId).catch(err => catcher)
    const test = await givePulsarRoles(gmodstorePurchases, userId).catch(err => catcher)

    res.status(200).json({"data": "OK"})
}