// serveur.js
const app = require('./index');
const port = 3000;

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
  console.log('Routes disponibles:');
  console.log('- GET /add/:a/:b');
  console.log('- GET /subtract/:a/:b');
  console.log('- GET /multiply/:a/:b');
  console.log('- GET /divide/:a/:b');
});