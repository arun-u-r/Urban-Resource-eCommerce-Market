import mongoose from "mongoose";


const connectDatabase = () => {
    const db = process.env.DB_LOCAL_URI ;
    mongoose.connect(db,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`MongoDB is connected to the host: ${con.connection.host}`)
    })//no catch fn ==> the unhandled rejection error is handled in index.js

}

export default connectDatabase;