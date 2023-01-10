import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient} from "@prisma/client";
import { useState } from "react";



export  const authOptions  ={
    pages: {
        signIn: "/login"
        //, signOut: "/signout"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",

            async authorize(credentials, req){
						const prisma = new PrismaClient()
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                });
						await prisma.$disconnect();
                if(!user) return null
                if (user.password == credentials.password){
                        return user
                }
                return null
                }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
          if (user) {
            token.name = user.username;
            token.email = user.email;
        
          }
          return token;
        },
        session: ({ session, token }) => {
          if (token) {
            session.user.name = token.name;
            session.user.email = token.email;
          }
          return session;
        },
    },
}

export default NextAuth(authOptions)




