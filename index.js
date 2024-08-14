import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); 

app.get('/', (req, res) => {
    res.send('Selamat datang di API Daya Rekadigital Indonesia');
  });

  app.use('/customers', customerRoutes);
  app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
