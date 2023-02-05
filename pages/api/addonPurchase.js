import axios from "axios";
import ids from "@helpers/ids.json"
import {fetchFromGmodstoreID} from "@helpers/prisma";
import {giveRole} from "@helpers/pulsar";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(500).json({data: 'Invalid method'})
        return
    }

    if (!req.body || !req.body.user) {
        res.status(500).json({data: 'Missing user'})
        return
    }

    const { body } = req;
    const { addon } = body;
    const { user } = body;
    const { uuid } = user;

    if (!uuid) {
        res.status(500).json({data: 'Missing uuid'})
        return
    }

    const addonId = addon.uuid

    const DBUser = await fetchFromGmodstoreID(uuid).catch((e) => {
        return
    })

    const discordID = DBUser.discordID
    await giveRole(discordID, addonId).catch((e) => {
        return
    }).then(() => {
        res.status(200).json({data: "OK"})
    })
}

