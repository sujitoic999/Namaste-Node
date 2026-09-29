const express = require('express');
const app = express();

app.use('/', (req, res) => {
  res.send('Hello from the dashboard!');
});

app.use('/test', (req, res) => {
  res.send('Hello from the server!');
});

app.use('/hello', (req, res) => {
  res.send('Hello hello hello');
});

app.listen(3000, () => {
  console.log('Server is successfully listening in port 3000.');
});
