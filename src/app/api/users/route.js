const { NextResponse } = require("next/server")
import {v2 as cloudinary} from 'cloudinary';
import db from "@/app/libs/db"
import bcrypt from 'bcrypt'
import { string } from 'zod';

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
export async function POST (req) {
  try {
    const data = await req.json()

    const userFound = await db.users.findUnique({
      where: {
        email: data.email,
      },
    })
    if(userFound){
      return NextResponse.json({message: "user already exist"}, {status: 400})
    }
      const hashedPassword = await bcrypt.hash(data.password, 10)
      const newUser = await db.users.create({data:{
        email: data.email,
        password: hashedPassword,
        img: data.image
      }})
    const {password: _, ...user} = newUser
    return NextResponse.json(user)
  } catch (error) {
    NextResponse({message: error.message}, {status: 500})
  }
}

export async function PATCH (req) {
  const data = await req.formData()
  const name = data.get('name')
  const email = data.get('email')
  const bio = data.get('bio')
  const image = data.get('image')
  const phone = data.get('phone')
  const password = data.get('password')
  const session = JSON.parse(data.get('session'))
  let hashedPassword
  if(password){
    hashedPassword = await bcrypt.hash(password, 10)
  }
 

  const img = async () => {
    if(typeof image === 'object' && image !== null){
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
        
      }).end(buffer)
      })
      return response.secure_url
     }
     else if(typeof image === 'string') {
      return image
     }
  }
  const result = await img()
  const userData = {}
  if(name) userData.name = name
  if(email) userData.email = email
  if(bio) userData.bio = bio
  if(image) userData.img = result
  if(phone) userData.phone = phone
  if(password) userData.password = hashedPassword
  console.log(userData)
   const updatedUser = await db.users.update({
      where: {
        email: session.user.email
      },
      data: userData
   })
   delete updatedUser.password

  return NextResponse.json({message: 'user updated', updatedUser}, {status: 200})
}
