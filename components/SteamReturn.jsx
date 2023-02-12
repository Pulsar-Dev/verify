import Logo from '@/components/Logo'
import Account from '@/components/SteamAccount'
import React from 'react'
import useSWRMutation from 'swr/mutation'
import { GmodstoreUser } from '@/components/GmodstoreReturn'
import Error from '@/components/Errors'

async function fetcher(url, { arg }) {
  url = url.replace('{steamID}', arg)
  return fetch(url, {
    method: 'GET',
  }).then((res) => res.json())
}
export default function SteamReturn({ user, accounts }) {
  const userID = user.id
  const [canClick, setCanClick] = React.useState(true)

  let { trigger, data, error } = useSWRMutation(
    `/api/getGmodstorePurchases?steamID={steamID}&userID=${userID}`,
    fetcher,
  )
  if (data) {
    if (data.status === 404) {
      return <Error error={data.data} />
    }

    return <GmodstoreUser data={data} />
  }
  if (error) {
    console.error(error)
    return <Error />
  }

  const onClick = async (steamID) => {
    if (!canClick) return
    setCanClick(false)

    try {
      await trigger(steamID)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div>
        <Logo />
        <h1 className="text-2xl font-semibold text-white">
          Hey {user.username}
        </h1>
        <h2 className="text-xl font-semibold text-white">
          Please select the correct Steam account.
        </h2>
        <p className="text-xs text-white">
          If you don't see your account, please make sure its linked to your
          Discord.
        </p>

        <div className="flex items-center justify-center align-center mt-4">
          <div className="backdrop-blur bg-white/30 dark:bg-gray-900/30 rounded-lg">
            <div className="grid grid-cols-1 gap-1 p-1">
              {accounts.map((account, index) => {
                return (
                  <Account
                    key={index}
                    account={account}
                    onClick={onClick}
                    canClick={canClick}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
