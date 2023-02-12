import ids from '@/ids.json'
import { fetchFromGmodstoreID } from '@helpers/prisma'
import {giveRole, removeRole} from '@helpers/pulsar'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(500).json({ data: 'Invalid method' })
        return
    }

    if (!req.query.auth || req.query.auth !== process.env.API_AUTH_KEY) {
        res.status(401).json({ data: 'Unauthorized' })
        return
    }

    if (!req.body || !req.body.user) {
        res.status(500).json({ data: 'Missing user' })
        return
    }

    const { body } = req
    const { addon } = body
    const { user } = body
    const { uuid } = user

    if (!uuid) {
        res.status(500).json({ data: 'Missing uuid' })
        return
    }

    const addonId = addon.uuid

    const DBUser = await fetchFromGmodstoreID(uuid)

    if (!DBUser) {
        res.status(500).json({ data: 'User not found' })
        return
    }

    const discordID = DBUser.discordID
    const discordRole = ids[addonId]
    const revokedRole = ids["revoked"]
    await removeRole(revokedRole, discordID).catch(() => {})
    await giveRole(discordRole, discordID).then(() => {
        res.status(200).json({ data: 'OK' })
    })
}
