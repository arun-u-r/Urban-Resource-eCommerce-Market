import express from 'express';
import cors  from 'cors';
import productRouter from './routes/productRoutes.js';
import errorMiddleware from './middlewares/error.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import orderRouter from './routes/orderRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname= path.dirname(fileURLToPath(import.meta.url))

const app = express();
  
const uploadDir = path.join(__dirname, 'uploads', 'user');
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });//create directory if doesn't exists

}

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//Cross-Origin Resource Sharing------------
app.use(cors({
    origin: 'http://127.0.0.1:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
    optionsSuccessStatus:204, 
}))


// Routes--------------------------------

app.use('/api/v1/',productRouter);
app.use('/api/v1/', authRouter)
app.use('/api/v1/', orderRouter)

//error middlewaare-------------------------
app.use(errorMiddleware)

 export default  app;