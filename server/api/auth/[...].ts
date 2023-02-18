import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { client } from '~/utils/prisma'
const CLIENT_ID = process.env.CLIENT_ID!
const CLIENT_SECRET = process.env.CLIENT_SECRET!

export default NuxtAuthHandler({
	adapter: PrismaAdapter(client),
	secret: process.env.AUTH_SECRET,
	pages: { signIn: '/login' },
	providers: [
		// @ts-expect-error
		GithubProvider.default({
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
		}),
	],
})
