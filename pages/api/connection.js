import {getAccessToken, getUserId, getUserSteamID} from "@/helpers/discord";
import {getGmodstoreID, getGmodstorePurchases} from "@/helpers/gmodstore";
import {givePulsarRoles} from "@/helpers/pulsar";
import {addUserToDB} from "@/helpers/prisma";
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
        await returnData(res, 500, "Missing code")
        return
    }
    try {
        const accessToken = await getAccessToken(code).catch(async (e) => {
            await returnData(res, 500, e)
        })

        const steamId = await getUserSteamID(accessToken).catch(async (e) => {
            await returnData(res, 500, e)
            return
        })

        const userId = await getUserId(accessToken).catch(async (e) => {
            await returnData(res, 500, e)
            return
        })

        const gmodstoreId = await getGmodstoreID(steamId).catch(async (e) => {
            await returnData(res, 500, e)
            return
        })

        const gmodstorePurchases = await getGmodstorePurchases(gmodstoreId).catch(async (e) => {
            await returnData(res, 500, e)
            return
        })

        await addUserToDB(userId, steamId, gmodstoreId).catch(async (e) => {
            await returnData(res, 500, e)
            return
        })

        await givePulsarRoles(gmodstorePurchases, userId).then(async () => {
            await returnData(res, 200, "OK")
        }).catch(async (e) => {
            await returnData(res, 500, e)
            return
        })

    } catch (e) {
        console.error(e)
        await returnData(res, 500, "Internal Server Error")
    }
}

