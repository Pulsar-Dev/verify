const axios = require("axios");
const accessToken = process.env.GMODSTORE_TOKEN;

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
        console.time("getMe")
        axios.get(`https://www.gmodstore.com/api/v3/me`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then(res => {

        }).catch((e) => {
            res.status(500).json({data: e})
        })
        console.timeEnd("getMe")
    } catch (e) {
        res.status(500).json({data: "Internal Server Error"})
    }
}

