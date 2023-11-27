import {writeFile} from 'fs/promises'
import path, { resolve } from 'path'
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
export async function POST (req) {
  const data = await req.formData()
  const name = data.get('name')
  const bio = data.get('bio')
  const phone = data.get('phone')
  const email = data.get('email')
  const password = data.get('password')
  const image = data.get('image')
 console.log(image)

 if(image){
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // const filePath = path.join(process.cwd(), 'public', image.name)
  // writeFile(filePath, buffer)
  // console.log('archivo guardado en filepath', filePath)
 const response = await new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream({}, (err, result) => {
    if (err) {
      reject(err)
    }
    resolve(result)
    
  }).end(buffer)
  })
  console.log(response)
 }
  
  return new Response(JSON.stringify('uploaded file'))
}