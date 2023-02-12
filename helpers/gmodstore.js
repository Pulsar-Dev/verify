import axios from 'axios'
const accessToken = process.env.GMODSTORE_TOKEN
import ids from '../ids.json'

async function getGmodstoreUser(steamId) {
  try {
    console.log('🔃 | Getting Gmodstore UUID from Gmodstore API')
    const returnData = await axios.get(
      `https://www.gmodstore.com/api/v3/users?filter[steamId]=${steamId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    const data = returnData.data
    return data.data[0] || null
  } catch (e) {
    console.error(e)
    return new Error('GModStore API returned error when fetching ID')
  }
}

async function getGmodstorePurchases(gmodstoreId) {
  try {
    console.log('🔃 | Getting Gmodstore purchases from Gmodstore API')
    const addonIds = ids
    const ignoreIds = ['customer', 'revoked']

    const productIds = []
    for (const [key] of Object.entries(addonIds)) {
      if (ignoreIds.includes(key)) continue
      productIds.push(key)
    }

    const params = new URLSearchParams([
      ['perPage', 100],
      ['filter[revoked]', false],
      ['filter[productId]', productIds],
    ])
    const returnData = await axios.get(
      `https://www.gmodstore.com/api/v3/users/${gmodstoreId}/purchases`,
      {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    const data = returnData.data
    return data.data || null
  } catch (e) {
    console.error(e)
    return new Error('Unable to fetch purchases from GModStore API')
  }
}

module.exports = {
  getGmodstoreUser,
  getGmodstorePurchases,
}
