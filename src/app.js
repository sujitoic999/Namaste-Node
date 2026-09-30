const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  res.send({ firstName: 'Akshay', lastName: 'Saini' });
});

app.post('/user', (req, res) => {
  console.log('Save Data to the database');
  //saving data to DB
  res.send('Data successfully saved to the database!');
});

app.delete('/user', (req, res) => {
  res.send('Deleted successfully!');
});

// app.use('/test', (req, res) => {
//   res.send('Hello from the server!');
// });

// app.use('/hello/2', (req, res) => {
//   res.send('Hello Abra');
// });

// app.use('/hello', (req, res) => {
//   res.send('Hello hello hello');
// });

// app.use('/', (req, res) => {
//   res.send('Hello from the dashboard!');
// });

app.listen(3000, () => {
  console.log('Server is successfully listening in port 3000.');
});
