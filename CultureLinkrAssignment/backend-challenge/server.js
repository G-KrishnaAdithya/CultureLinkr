
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.post('/api/total-value', (req, res) => {
  const products = req.body;

  if (!Array.isArray(products)) {
    return res.status(400).json({ error: 'Invalid input, expected an array of products.' });
  }

  let totalValue = 0;

  products.forEach(product => {
    if (product.price && typeof product.price === 'number') {
      totalValue += product.price;
    }
  });

  res.json({ totalValue });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
