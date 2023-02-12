import Verify from '@/components/Verify'
import useSWRImmutable from 'swr/immutable'
import { useRouter } from 'next/router'
import SteamReturn from '@/components/SteamReturn'
import Error from '@/components/Errors'

const fetcher = async (url) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error(res.data)

    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export default function Discord({}) {
  const router = useRouter()
  const { code } = router.query
  if (!code) {
    return <Error error={'Missing code. Please try again.'} />
  }

  const { data, error } = useSWRImmutable(
    `/api/getSteamAccounts?code=${code}`,
    fetcher,
  )

  if (data && data.status === 404) {
    return <Error error={data.data} />
  }

  if (error) {
    console.error('error:', error)
    return <Error />
  }

  if (!data) {
    return (
      <>
        <div className="flex items-center justify-center align-center py-12">
          <Verify />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex items-center justify-center align-center py-12">
        <SteamReturn user={data.user} accounts={data.steamAccounts} />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}
