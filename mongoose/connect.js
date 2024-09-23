import mongoose from "mongoose";

export default async function dbConnect() {
  try{
    await mongoose.connect('mongodb://localhost:27017', { dbName: 'FullStack2' });
    console.log('몽고DB 연결 성공');
  }catch(e){
    console.log(e.message);
  }
}
