require('dotenv').config();

//  importando a biblioteca para a variavel express
const express = require('express');

//  instanciando essa biblioteca afim de usa-la no sistema
//  fazemos isso chamando o construtor do express
const app = express();


//  implementação de middleware
app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

//  afim de usarmos essa instanciação do express que chamamos de app para outros
//  arquivos

//  usamos a seguinte função para exportar o modulo express
module.exports = app;
