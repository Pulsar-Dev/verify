import React from 'react'
import Logo from '@/components/Logo'

export function GmodstoreUser({ data }) {
  const name = data.name

  return (
    <div>
      <Logo />
      <div>
        <h1 className="text-2xl font-semibold text-white">Hey {name}</h1>
        <h2 className="text-xl font-semibold text-white">
          You have been successfully verified!
        </h2>
      </div>
    </div>
  )
}
