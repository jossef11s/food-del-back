import mongoose from "mongoose";
export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://greatstack:youssefsinda11@cluster0.i8hjy.mongodb.net/?').then(()=> console.log('DB Connected'))
}