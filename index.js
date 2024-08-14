import express from 'express';
import customerRoutes from './routes/customerRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Selamat datang di API Daya Rekadigital Indonesia');
  });

app.use('/api', customerRoutes);
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
