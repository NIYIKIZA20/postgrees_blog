import multer from "multer";
import { Request,Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { writeFile, unlink ,readFile} from "fs";
import { join } from "path";

const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;
const cloudinary_api_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;

cloudinary.config({
  cloud_name: cloudinary_api_cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
  secure: true,
});

export const uploadFile = async (file: Express.Multer.File): Promise<string> => {
  const result = await cloudinary.uploader.upload(file.path, {
    folder: 'blog_images',
    resource_type: 'image',
  });
  return result.secure_url;
};

const getExtensation = (ext:string)=>{
    let ex= '';
    switch(ext){
        case 'image/jpeg':
       ex= 'jpg';
        break;
        case 'image/png':
            ex='png'
            break
            default :
            ex='jpg'

    }
    return ex
}
const MulterFilterFile = (req: any, file: any, cb: any) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  cb(null, uniqueSuffix+ "-"+ file.originalname);
};
export const storage = multer.diskStorage({
  destination: "uploads",
  filename: MulterFilterFile,
});
export const upload = multer({ storage });

interface RequestParams extends Request{
    params:{
        filename:string
    }
}
export const ReadFileName = (req:RequestParams,res:Response)=>{
    const {filename}= req.params
    const path = join(__dirname,'../../uploads/'+filename)
    readFile(path,(error,result)=>{
        if(error){
            console.log(error)
            res.send(error)
        }
        res.send(result)
    
    })
}