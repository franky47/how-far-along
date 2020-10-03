import React from 'react'

export function useHashQuery(name: string) {
  const [date, setDate] = React.useState<string | null>(null)

  const set = React.useCallback(
    (value: string) => {
      const query = new URLSearchParams(window.location.hash.replace(/^#/, ''))
      query.set(name, value)
      window.location.hash = `#${query.toString()}`
    },
    [name]
  )

  React.useEffect(() => {
    const update = () => {
      const query = new URLSearchParams(window.location.hash.replace(/^#/, ''))
      setDate(query.get(name))
    }
    window.addEventListener('hashchange', update)
    update()
    return () => {
      window.removeEventListener('hashchange', update)
    }
  }, [name])

  return [date, set] as const
}
