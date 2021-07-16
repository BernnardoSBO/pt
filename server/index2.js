// importando o modulo que instanciamos em express-config.js
const app = require('./config/express-config');

const User = require('./users/model/User');

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/user', (req, res) => {
  const pessoa = {
    nome: 'Bernnardo',
    sobrenome: 'Seraphim',
  };

  res.json(pessoa);
});

app.post('/mirror', (req, res) => {
  res.json(req.body);
});
// para executar o express, utilizamos:
// parametros(porta, nome host, callback function)
app.listen(3000, 'localhost', ()=>console.log('Servidor rodando'));
