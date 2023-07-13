import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import contactUsRouter from './routes/admin.js';

dotenv.config() //config .env file

const app = express();
const port = 3000;

//enstablish database connection
connectDB();


app.use('/api/contact-us', contactUsRouter)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}!`));