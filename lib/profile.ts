import { auth, currentUser, redirectToSignIn } from '@clerk/nextjs'

import { db } from './db'
import { Profile } from '@prisma/client'

export async function getOrCreateProfile(): Promise<Profile> {
  const user = await currentUser()
  if (!user) return redirectToSignIn()

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  })
  if (profile) return profile

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    },
  })

  return newProfile
}

export async function getProfile(): Promise<Profile | null> {
  const { userId } = auth()
  if (!userId) return null

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  })

  return profile
}
