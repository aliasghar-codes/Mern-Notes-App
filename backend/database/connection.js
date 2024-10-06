import mongoose from "mongoose";

const connection = async () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Your Database connected successfully..."))
    .catch( error => console.log("Error connecting to database"))
};

export default connection;