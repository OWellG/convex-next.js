"use client"
import { useEffect, useRef } from "react"
import { useUser } from "@clerk/nextjs"
import posthog from "posthog-js"

export function PostHogUserIdentifier() {
  const { user, isLoaded } = useUser()
  const didIdentifyRef = useRef(false)

  useEffect(() => {
    if (!isLoaded) return

    if (user) {
      posthog.identify(user.id, {
        username: user.username ?? undefined,
      })
      didIdentifyRef.current = true
    } else if (didIdentifyRef.current) {
      posthog.reset()
      didIdentifyRef.current = false
    }
  }, [user, isLoaded])

  return null
}
