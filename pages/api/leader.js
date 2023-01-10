import prisma from "../../lib/prisma";

export default async function handler(req, res) {
    console.log(req)
    const user = await prisma.cockie.findMany({
        where: {
            username: 'admin'
        }
    })
    console.log(user)
    res.json(user)
  }