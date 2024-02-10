var express = require("express");
var app = express.Router();

function validFash(params) {
  return params = (params == undefined || params.lenght == 0) ? "" : params;
}

app.get("/", (req, res) => {
  var error = req.flash("error");

  var nome = req.flash("nome");
  var email = req.flash("email");
  var endereco = req.flash("endereco");
  var endereco2 = req.flash("endereco2");
  var cidade = req.flash("cidade");
  var estado = req.flash("estado");
  var cep = req.flash("cep");
  var ckeck = req.flash("ckeck");

  error = validFash(error);

  nome = validFash(nome);
  email = validFash(email);
  endereco = validFash(endereco);
  endereco2 = validFash(endereco2);
  cidade = validFash(cidade);
  estado = validFash(estado);
  cep = validFash(cep);
  ckeck = validFash(ckeck);

  res.render("index", {error: error, nome: nome, email: email, endereco: endereco, endereco2: endereco2, cidade: cidade, estado: estado, cep: cep, ckeck: ckeck });
});

app.post("/form", (req, res) => {
  var {nome, email, endereco, endereco2, cidade, estado, cep, ckeck} = req.body;
 
  var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var regexTexto = /^[\p{L}\p{M}]+$/u;
  var regexCaracter =/[^a-zA-Z0-9\s]/;
  var error;

  if(nome === '' || email === '' || cidade === '' || estado === '' || cep === '' || endereco === '') {
    error = 'Por favor, preencha todos os campos.';
  }

  if(nome.lenght < 3 || nome.indexOf(" ") == -1) {
    error = "Por favor, coloque um nome e sobrenome válido.";
  }

  if(regexCaracter.test(nome)) {
    error = "Por favor, coloque um nome e sobrenome válido.";
  }

  if(email.indexOf("@") == -1 || email.indexOf(".") == -1 || email == "" || !regexEmail.test(email)) {
    error = "Indique um e-mail válido.";
  }

  if(ckeck != 1) {
    error = 'Por favor, de um teck no botão "Clique em mim".';
  }

  if(cep.lenght < 6) {
    error = 'Revise o CEP.';
  }

  if(error != undefined) {
    req.flash("error", error);

    req.flash("nome", nome);
    req.flash("email", email);
    req.flash("endereco", endereco);
    req.flash("endereco2", endereco2);
    req.flash("cidade", cidade);
    req.flash("estado", estado);
    req.flash("cep", cep);
    req.flash("ckeck", ckeck);

    res.redirect("/");

  } else {
    req.flash("nome", nome);

    res.redirect("/sucess");
  }
});

app.get("/sucess", (req, res) => {
  var nome = req.flash("nome");
  
  nome = validFash(nome);

  res.render("sucess", {nome: nome});
});

module.exports = app;