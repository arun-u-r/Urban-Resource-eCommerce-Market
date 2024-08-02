import express from 'express';
import cors  from 'cors';
// import todoRoutes from './routes/todoRoutes.js'
import productRouter from './routes/productRoutes.js';
import errorMiddleware from './middlewares/error.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import orderRouter from './routes/orderRoutes.js';

const app = express();
 
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// Routes=============================

// app.use('/api/todo',todoRoutes)
app.use('/api/v1/',productRouter);
app.use('/api/v1/', authRouter)
app.use('/api/v1/', orderRouter)

//==================================== 
app.use(errorMiddleware)

 export default  app;