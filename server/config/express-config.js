require('dotenv').config();

//  importando a biblioteca para a variavel express
const express = require('express');

//  instanciando essa biblioteca afim de usa-la no sistema
//  fazemos isso chamando o construtor do express
const app = express();

const cors = require('cors');
app.use(cors());

const cookieParser = require('cookie-parser');

// package para express conseguir fazer o parse dos cookies
app.use(cookieParser());

//  implementação de middleware
app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

require('./auth');

const usersRouter = require('../users/controller/user-controller');

app.use('/users', usersRouter);

//  afim de usarmos essa instanciação do express que chamamos de app para outros
//  arquivos

//  usamos a seguinte função para exportar o modulo express
module.exports = app;
