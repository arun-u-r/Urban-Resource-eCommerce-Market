import express from 'express';
import cors  from 'cors';
// import todoRoutes from './routes/todoRoutes.js'
import productRouter from './routes/productRoutes.js';
import errorMiddleware from './middlewares/error.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
 
app.use(cookieParser())
app.use(express.json());
app.use(cors());


// Routes=============================

// app.use('/api/todo',todoRoutes)
app.use('/api/v1/',productRouter);
app.use('/api/v1', authRouter)

//==================================== 
app.use(errorMiddleware)

 export default  app;