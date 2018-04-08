var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const db = require('./db');
db.connect();

// var coins = [{name: "Bitcoin", buy_price: 10, sell_price: 1}, {name: "Ethereum", buy_price: 10, sell_price: 1}];

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

var api = express.Router();

api.get('/coins', (req, res, next) => {
  db.getCoins((err, coins) => {
    if(err){
      console.log("error");
      return next(err);
    }
    console.log("getting coins");
    res.send(coins);
  });
});

api.post('/coins', (req, res, next) => {
  // coins.push(req.body);
  db.addCoins(req.body, (err, coins) => {
    if(err){
      console.log("error");
      return next(err);
    }
    console.log("adding coin");
    res.json(req.body);
  });
})

app.use('/api', api);
app.listen(4040);
