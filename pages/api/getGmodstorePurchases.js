import {getGmodstorePurchases, getGmodstoreUser} from "@helpers/gmodstore";
import {addUserToDB} from "@helpers/prisma";
import {givePulsarRoles} from "@/helpers/pulsar";

let returnedData = false

async function returnData(res, status, data) {
    if (returnedData) return;
    returnedData = true
    res.status(status).json({data: data, status: status})
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        await returnData(res, 405, "Invalid Method")
        return
    }

    const steamID = req.query.steamID || null
    const userID = req.query.userID || null

    if (!steamID || !userID) {
        await returnData(res, 500, "Missing Query Parameters")
        return
    }

    const catcher = async (e) => {
        await returnData(res, 500, e)
    }

    const gmodstoreUser = await getGmodstoreUser(steamID).catch(catcher)
    if (!gmodstoreUser) {
        await returnData(res, 404, "No Gmodstore Account Found.")
        return
    }
    const gmodstoreId = gmodstoreUser.id

    const gmodstorePurchases = await getGmodstorePurchases(gmodstoreId).catch(catcher)
    if (!gmodstorePurchases) {
        await returnData(res, 404, "No Gmodstore Purchases Found")
        return
    }

    await addUserToDB(userID, steamID, gmodstoreId).catch(catcher)

    await givePulsarRoles(gmodstorePurchases, userID).then(() => {
        const data = {
            name: gmodstoreUser.name
        }

        res.status(200).json(data)
    }).catch(catcher)


}

