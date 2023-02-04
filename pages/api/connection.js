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
    console.log("a")
    const accessToken = await getAccessToken(code)
    console.log("b")
    console.log("TOKEN:", accessToken)
    const steamId = await getUserSteamID(accessToken)
    console.log("c")
    const promise1 = Promise.all([
        getUserId(accessToken),
        getGmodstoreID(steamId)
    ])
    console.log("d")
    const promise1Out = await promise1
    const userId = promise1Out[0]
    const gmodstoreId = promise1Out[1]
    console.log("e")
    const gmodstorePurchases = await getGmodstorePurchases(gmodstoreId)
    console.log("f")
    await givePulsarRoles(gmodstorePurchases, userId)
    console.log("g")
    res.status(200).json({"data": "OK"})
}

