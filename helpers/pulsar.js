import axios from 'axios'
import ids from '../ids.json'
const guild = process.env.PULSAR_GUILD
const accessToken = process.env.PULSAR_TOKEN

async function giveRole(roleId, userId, addonId) {
  try {
    console.log(
      `🔃 | Giving role to user [User ID: ${userId}, Role ID: ${roleId}, Addon ID: ${addonId}]`,
    )
    await axios.put(
      `https://discord.com/api/v10/guilds/${guild}/members/${userId}/roles/${roleId}`,
      {},
      {
        headers: {
          Authorization: `Bot ${accessToken}`,
          'X-Audit-Log-Reason': `User verified. AddonID: ${addonId}`,
        },
      },
    )
  } catch (e) {
    console.error(e)
    return new Error('Unable to give role')
  }
}

async function removeRole(roleId, userId, addonId) {
  try {
    console.log(
      `🔃 | Removing role from user [User ID: ${userId}, Role ID: ${roleId}, Addon ID: ${addonId}]`,
    )
    await axios.delete(
      `https://discord.com/api/v10/guilds/${guild}/members/${userId}/roles/${roleId}`,
      {
        headers: {
          Authorization: `Bot ${accessToken}`,
          'X-Audit-Log-Reason': `User Revoked. AddonID: ${addonId}`,
        },
      },
    )
  } catch (e) {
    console.error(e)
    return new Error('Unable to remove role')
  }
}

async function givePulsarRoles(purchases, userId) {
  let customer = false
  console.log('🔃 | Looping through purchases to give roles')
  await purchases.forEach((purchase) => {
    const id = purchase.productId
    const roleId = ids[id]
    if (!roleId) return
    try {
      giveRole(roleId, userId, id)
    } catch (e) {
      console.error(e)
      return new Error('Unable to give customer role')
    }
    customer = true
  })
  if (customer) {
    try {
      await giveRole(ids['customer'], userId, 'CUSTOMER')
    } catch (e) {
      console.error(e)
      return new Error('Unable to give customer role')
    }
  }
}

module.exports = {
  givePulsarRoles,
  giveRole,
  removeRole,
}
