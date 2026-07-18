const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur la calculatrice API!');
});

app.get('/add/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.json({ result: a + b });
});

app.get('/subtract/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.json({ result: a - b });
});

app.get('/multiply/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.json({ result: a * b });
});

app.get('/divide/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  
  if (b === 0) {
    return res.status(400).json({ error: "Division by zero" });
  }
  
  res.json({ result: a / b });
});

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Calculatrice API listening at http://localhost:${port}`);
  });
}// Commentaire de test
