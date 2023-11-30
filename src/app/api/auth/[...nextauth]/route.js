import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./../../../libs/db"
import bcrypt from 'bcrypt'

const authOptions = {
  callbacks: {
    async signIn({ user, account, credentials }) {
      console.log('en el sign')
      if(account.provider == 'credentials') {
        console.log('en credentials')
        return(user)
      } else if (account.provider == 'google' || account.provider == 'github') {
        const userFound = await db.users.findUnique({
          where: {
            email: user.email
          }
        })
        if(!userFound) {
          const newUser = await db.users.create({data:
            {
            name: user.name,
            email: user.email,
            img: user.image,
          }
          })
          return(newUser)
        } else if(userFound) return(userFound)
        console.log('en el else')
        console.log(user)
      }
    }
  },
  pages: {
    signIn: '/login',
  },
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "email", type: "text", placeholder: "jsmith"},
        password: {label: "password", type: "password"}
      },
      async authorize (credentials, req) {
        const userFound = await db.users.findUnique({
        where: {
          email: credentials.email
        }
      })
      if (!userFound) throw new Error ('No user found')
      
      const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
      if (!matchPassword) throw new Error ('Wrong password')
      
      return userFound
      }  
    },
    )
  ],

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }