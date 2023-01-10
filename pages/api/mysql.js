import prisma from '../../lib/prisma'

export default async function handler(req, res) {



const db = await prisma.user.findMany()

res.json(db)
}