const express = require('express');
const app = express();
const http = require('http').Server(app);
const mysql = require('mysql');
const bodyParser = require('body-parser');

const session = require('express-session');
const sessionStore = require('express-mysql-session')(session);
const cors= require('cors');

var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'thtka13',
  database:'sosam'
});

http.listen(3000, function(){
  console.log('server start');
  db.connect();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use(session({
  key: 'sid',
  secret: 'secretSosam!dawnannaseonghye@@',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  },
  store : new sessionStore({
    host: 'localhost',
    port : '3306',
    user : 'root',
    password : 'thtka13',
    database : 'sessionDB'
  })
}));

app.get('/isLoggedIn', function(req, res){ // 로그인상태
  console.log(req.session.userid)
  if(req.session.userid!=null)
  res.send(true);
  else res.send(false);
})

app.get('/idcheck', function(req,res){
  let {id} = req.query;
  console.log(id);
  db.query(`select * from user where id='${id}'`, function(err, rows, fields){
    if(err) {
      console.log(err);
      res.send(false);
    }
    console.log(rows);
    if(rows.length)
    res.send(true);
    else
    res.send(false);
  })
});

app.get('/userinfo', function(req,res){
  db.query(`select id, name, address, phone, age, message, nickname from u                                                                             ser`, function(err, rows, fields){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.send(rows);
  })
});


app.get("/logout", function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');
  console.log("로그아웃");
  res.send(true);
});


app.post('/login', function(req,res){
  let {id, passwd} = req.body;
  db.query(`select * from user where id='${id}'and passwd='${passwd}'`, functi                                                                             on(err, rows, fields){
    if(err)
    {
      res.send(false);
    }
    else{
      console.log(rows)
      if(rows.length){
        if(rows[0].passwd == passwd){
          res.send(rows);
          req.session.userid = id;
          console.log(req.session.userid);
          req.session.save(()=>{console.log("saved")})
        }
      }
      else
      res.send(false);
    }
  })
});

app.get('/login', function(req, res, next){
  let session = req.session;
  if(session.userid)
  res.send(true);
  else
  res.send(false);
});

app.post('/register', function(req,res){
  console.log(req.body);
  let {id, passwd, name, address, phone, age, message, nickname} = req.body;
  age = Number(age);
  db.query(`insert into user(id, passwd, name, address, phone, age, message, n                                                                             ickname)
  values('${id}', '${passwd}', '${name}', '${address}', '${phone}', ${age},                                                                              '${message}', '${nickname}' )`, function(err, rows, fields){
    if(err) {
      console.log(err);
      res.send(false);
    }
    else{
      db.query(`insert into energy_amount(amount, id) values(0, '${id}')` ,f                                                                             unction(err, rows, fiedls){
        if(err) {
          console.log(err);
          res.send(false);
        }
        else
        res.send(true);
      })
    }
  }  )
});

app.get('/rank', function(req,res){
  db.query(`select e.amount, u.nickname, u.message from energy_amount as e, us                                                                             er as u where e.id = u.id order by e.amount desc limit 10`, function(err, rows,                                                                              fields){
    if(err) {
      console.log(err);
      res.send(err);
    }
    res.send(rows);
  })
});

app.post('/donate', function(req,res){
  let {  date, time, energy, donateto} = req.body;
  let id = req.session.userid;
  let uamount = 0;
  energy = Number(energy);
  db.query(`insert into donate(id, date, time, energy, donateto)
  values('${id}', '${date}', '${time}', ${energy},  '${donateto}')`, functio                                                                             n(err, rows, fields){
    if(err) {
      console.log(err);
      res.send(err);
    }
    else{
      db.query(`select * from energy_amount where id='${id}'`, function(e                                                                             rr, rows, fields){
        if(err)
        res.send(err);
        else{
          uamount = rows[0].amount;
          db.query(`update energy_amount set amount=${uamount-energy} wher                                                                             e id='${id}'`, function(err, rows, fields){
            if(err) {
              console.log(err);
              res.send(err);
            }
            else
            res.send(true);
          });
        }
      });

    }
  })
});


app.post('/discount', function(req,res){
  let {  date, time, energy, address} = req.body;
  let id = req.session.userid;
  let uamount = 0;
  energy = Number(energy);
  db.query(`insert into discount(id, date, time, energy, address)
  values('${id}', '${date}', '${time}', ${energy},  '${address}')`, function                                                                             (err, rows, fields){
    if(err) {
      console.log(err);
      res.send(err);
    }
    else{
      db.query(`select * from energy_amount where id='${id}'`, function(err,                                                                              rows, fields){
        if(err)
        res.send(err);
        else{
          uamount = rows[0].amount;
          db.query(`update energy_amount set amount=${uamount-energy} where                                                                              id='${id}'`, function(err, rows, fields){
            if(err) {
              console.log(err);
              res.send(err);
            }
            else
            res.send(true);
          });
        }
      });
    }
  });
});

app.post('/exercise', function(req,res){
  if(req.body=={}) res.send('.');
  let { id, startwith, endwith, date, energy, fid} = req.body;
  let uamount = 0;
  energy = Number(energy);
  db.query(`insert into elec_energy(id, startwith, endwith, date, fid, energy)
  values('${id}', '${startwith}', '${endwith}', '${date}',  '${fid}',${energy}                                                                             )`, function(err, rows, fields){
    if(err) {
      console.log(err);
      res.send(err);
    }
    else{
      db.query(`select * from energy_amount where id='${id}'`, function(err, r                                                                             ows, fields){
        if(err){
          console.log(err);
          res.send(err);
        }
        else{
          uamount = rows[0].amount;
          db.query(`update energy_amount set amount=${uamount+energy} where id                                                                             ='${id}'`, function(err, rows, fields){
            if(err) {
              console.log(err);
              res.send(err);
            }
            else
            res.send(true);
          });
        }
      });
    }
  });
});



//다운

app.get('/energy', function(req,res){
  db.query(`select id, name, address, phone, age, message, nickname from u                                                                             ser`, function(err, rows, fields){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.send(rows);
  })
});
