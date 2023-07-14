import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandlerMiddleware.js';
import notFound from './middlewares/notFoundMiddleware.js';
import adminRouter from './routes/admin.js';
import apiRouter from './routes/api.js';
dotenv.config() //config .env file

const app = express();
const port = 3000;

//enstablish database connection
connectDB();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/contact-us', adminRouter);
app.use('/public/contact-us', apiRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}!`));