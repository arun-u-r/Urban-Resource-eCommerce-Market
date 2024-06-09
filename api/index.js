import app from "./app.js";
import dotenv, { config } from "dotenv";
import connectDatabase from "./config/database.js";

// absolute path
// import path from 'path';
// dotenv.consig({path:path.join(__dirname, "config/config.env")})

dotenv.config({ path: "config/config.env" });

connectDatabase(); 

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () =>
  console.log(
    `server is listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`
  )
);

process.on('unhandledRejection', (err)=>{
   console.log(`Error: ${err.message}`);
   console.log("Shutting down the server due to unhandled rejection error");
   server.close(()=>{
    process.exit(1)
   })
})


process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception error");
  server.close(()=>{
   process.exit(1)
  })
})
// console.log(first)