import { useEffect, useMemo } from 'react'
import ackeeTracker, { TrackingOptions } from 'ackee-tracker'

interface ServerDetails {
  server: string
  domainId: string
}

export const useAckee = function (
  pathname: string | null,
  environment: ServerDetails,
  options: TrackingOptions
) {
  const instance = useMemo(() => {
    return ackeeTracker.create(environment.server, options)
  }, [
    environment.server,
    options.detailed,
    options.ignoreLocalhost,
    options.ignoreOwnVisits,
  ])

  useEffect(() => {
    const hasPathname = pathname != null && pathname !== ''

    if (!hasPathname) return

    const attributes = ackeeTracker.attributes(options.detailed)
    const url = new URL(pathname, location as any)

    return instance.record(environment.domainId, {
      ...attributes,
      siteLocation: url.href,
    }).stop
  }, [instance, pathname, environment.domainId])
}
