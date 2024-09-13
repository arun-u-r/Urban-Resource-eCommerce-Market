import express from 'express';
import cors  from 'cors';
import productRouter from './routes/productRoutes.js';
import errorMiddleware from './middlewares/error.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import orderRouter from './routes/orderRoutes.js';

const app = express();
  
app.use(express.json());
app.use(cookieParser());

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