const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const transactions = [
  { id: 1, date: '2024-05-12', description: 'Payment for goods', amount: 50 },
  { id: 2, date: '2024-05-10', description: 'Payment for services', amount: 100 },
  { id: 3, date: '2024-05-08', description: 'Refund', amount: -20 },
  // Add more mock transactions here if needed
  { id: 4, date: '2024-05-06', description: 'Subscription renewal', amount: 30 },
  { id: 5, date: '2024-05-04', description: 'Online purchase', amount: 75 },
  { id: 6, date: '2024-05-02', description: 'Service fee', amount: 15 },
  { id: 7, date: '2024-04-30', description: 'Payment for software', amount: 90 },
  { id: 8, date: '2024-04-28', description: 'Refund', amount: -10 },
  { id: 9, date: '2024-04-26', description: 'Payment for subscription', amount: 25 },
  { id: 10, date: '2024-04-24', description: 'Online purchase', amount: 60 },
  { id: 11, date: '2024-04-22', description: 'Service charge', amount: 20 },
  { id: 12, date: '2024-04-20', description: 'Payment for goods', amount: 45 },
  { id: 13, date: '2024-04-18', description: 'Payment for services', amount: 110 },
  { id: 14, date: '2024-04-16', description: 'Refund', amount: -15 },
  { id: 15, date: '2024-04-14', description: 'Subscription renewal', amount: 35 },
  { id: 16, date: '2024-04-12', description: 'Online purchase', amount: 80 },
  { id: 17, date: '2024-04-10', description: 'Service fee', amount: 25 },
  { id: 18, date: '2024-04-08', description: 'Payment for software', amount: 95 },
  { id: 19, date: '2024-04-06', description: 'Refund', amount: -5 },
  { id: 20, date: '2024-04-04', description: 'Payment for subscription', amount: 30 },
];

app.get('/transactions', (req, res) => {
  res.json(transactions);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
