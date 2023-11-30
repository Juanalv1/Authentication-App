const { NextResponse } = require("next/server")
import db from "@/app/libs/db"
import bcrypt from 'bcrypt'

export async function GET (req, {params}) {
  try {
    const { email } = params
    const userFound = await db.users.findUnique({
      where: {
        email: email,
      },
    })
    if(!userFound) return NextResponse.json({message: "no email found"}, {status: 400})

    const {password: _, ...user} = userFound

    return NextResponse.json(user, {status: 200})


  } catch (error) {

  }
}