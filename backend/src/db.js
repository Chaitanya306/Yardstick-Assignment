import mongoose from 'mongoose'

export async function connectDB() {
    try {
        //
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        //const db=mongoose.connection.db.admin()
        //console.log(db)
        //let date=new Date("2025-01-28")
        //date.setHours(10)
        
      } catch (error) {
        console.log("MongoDB connection error:", error);
      }  
}

