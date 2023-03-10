import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Logo from '@/components/Logo'

export default function Hero() {
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_SIGNIN
  return (
    <>
      <div className="w-96">
        <Logo />
        <div className="min-w-full">
          <Link
            className="rounded-md flex items-center justify-center mt-6 bg-blurple-50 hover:bg-blurple-100 dark:bg-blurpleDark-50 dark:hover:bg-blurpleDark-100"
            href={discordUrl}
          >
            <h1 className="text-lg text-white text-center py-1 px-12">
              Login with Discord
            </h1>
          </Link>
        </div>
        <div className="mx-auto w-full min-w-md rounded-xl backdrop-blur bg-white/30 dark:bg-gray-900/30 p-1 mt-12">
          <Disclosure as="div" className="">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg backdrop-blur bg-white/50 dark:bg-gray-900/50 px-4 py-2 text-left text-sm font-medium text-black dark:text-white hover:bg-white/60 dark:hover:bg-gray-900/60">
                  <span>How do I verify?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-black dark:text-white`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black dark:text-white">
                  1. Add steam as a connection to your Discord account.
                  <br />
                  2. Login with Discord using the button above.
                  <br />
                  3. Wait for the verification to complete.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-1">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg backdrop-blur bg-white/50 dark:bg-gray-900/50 px-4 py-2 text-left text-sm font-medium text-black dark:text-white hover:bg-white/60 dark:hover:bg-gray-900/60">
                  <span>What data do you collect?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-black dark:text-white`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black dark:text-white">
                  - Your Discord ID
                  <br />
                  - Your Steam ID
                  <br />- Your Gmodstore ID
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  )
}
