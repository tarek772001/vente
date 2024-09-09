import express from 'express';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';

//ajout tarek
import path from 'path';
import cors from 'cors';


dotenv.config();

import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js'

//import products from './data/products.js';

//modif tarek
const port = process.env.PORT || 5050; 

connectDB();

const app = express();

//ajout tarek
app.use(express.urlencoded({ extended: true }));
app.use(cors('http://54.36.189.29'));

app.get('/', (req, res) => { 
   res.send('API is running...')
});

// app.get('/api/products', (req, res) => {
//     res.json(products);
// })

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find((p) => p._id === req.params.id);
//     res.json(product);
// })

app.use('/api/products', productRoutes);

//ajout tarek
if (process.env.NODE_ENV === 'production') {
   const __dirname = path.resolve();
   //app.use('/uploads', express.static('/var/data/uploads'));
   app.use(express.static(path.join(__dirname, '/frontend/build')));
 
   //any route that is not api will be redirected to index.html
   app.get('*', (req, res) =>
     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
   );
 } else {
   //const __dirname = path.resolve();
 //app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
   app.get('/', (req, res) => {
     res.send('API is running....');
   });
 }

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`))
