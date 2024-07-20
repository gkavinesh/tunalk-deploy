import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://admin:Thnalk2024@tuna-cluster.lvdp9oc.mongodb.net/Tuna').then(()=>console.log("DB Connected"));
}

