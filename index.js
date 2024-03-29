var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("express-flash");
var cookieParser = require("cookie-parser");
var RouterForm = require("./routers/formController");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser("auded92paCKages"));

app.use(session({ 
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(flash());

app.use("/", RouterForm);

app.listen(5678, (req, res) => {
  console.log("Servidor rodando na porta 5678.");
})