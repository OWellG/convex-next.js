"use client"

import { SignInButton } from "@clerk/nextjs";
import { ClerkProvider } from '@clerk/nextjs'

export default function Home() {
  return (
    <ClerkProvider>
      <SignInButton forceRedirectUrl="/" />
    </ClerkProvider>
  );
}