import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://admin:0RUBFV1tHuQcyeCS@tuna-cluster.lvdp9oc.mongodb.net/Tuna').then(()=>console.log("DB Connected"));
}

