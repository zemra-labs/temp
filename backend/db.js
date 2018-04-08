const pg = require('pg');

const client = new pg.Client('postgres://localhost/postgres');

const connect = ()=> {
  client.connect((err) => {
    if(!err) {
      console.log("no errr");
    }
  });
}


const getCoins = (cb) => {
  client.query('select * from coins', (err, result) => {
    if (err) {
      return cb(err);
    }
    cb(null, result.rows);
  });
};

const addCoins = (dt, cb) => {
  const text = 'INSERT INTO coins (name, buy_price, sell_price) VALUES($1, $2, $3) RETURNING *';
  client.query(text, [dt.name, dt.buy_price, dt.sell_price], (err, result) => {
    if (err) {
      return cb(err);
    }
    cb(null, result.rows);
  });
};

const end = () => {
  client.end((err) => {
    if (!err) {
      console.log('conn closed');
    }
  })
}
module.exports = {
  connect,
  getCoins,
  addCoins,
  end
};
