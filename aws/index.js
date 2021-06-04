
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mysql = require('mysql');
const bodyParser = require('body-parser');

const session = require('express-session');
const sessionStore = require('express-mysql-session')(session);
const cors= require('cors');

var db = mysql.createConnection({
  host:'',
  user:'',
  password:'',
  database:''
});

http.listen(3000, function(){
    console.log('server start');
        db.connect();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use(session({
  key: '',
  secret: '',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  },
  store : new sessionStore({
      host: '',
      port : '',
      user : '',
      password : '',
      database : ''
  })
}));

app.get('/isLoggedIn', function(req, res){ // 로그인 상태
        console.log(req.session.userid)
  if(req.session.userid)
     res.send(req.session.userid);
   else
        res.send('');
})

app.get('/energy', function(req,res){
        console.log(req.session.id)
  db.query(`select *  from energy_amount where id='${req.session.userid}'`, function(err, rows, fields){
    if(err)
    res.send(err);
    else
    res.send(rows);
  }
        )
});

app.get('/log', function(req,res){ // 
        let logs = {
        'exer' : null,
        'discount' : null,
        'donate' : null};
        db.query(`select date, startwith, endwith, energy from elec_energy  where id='${req.session.userid}' order by date, startwith`, function(err, rows, fields){
                if(err) res.send(err);
                else logs.exer=new Array(rows);
                console.log(rows[0]);
                });
        db.query(`select date, time, address, energy from discount where id='${req.session.userid}' order by date, time`, function(err, rows, fields){
                if(err) res.send(err);
                else logs.discount = rows;
                });
        db.query(`select date, time, energy, donateto from donate where id='${req.session.userid}' order by date, time`, function(err, rows, fields){
                if(err) res.send(err);
                else logs.donate = rows;
                });
        res.send(logs);
});




app.get('/logdis', function(req, res) {
  db.query(`select date, time, address, energy from discount where id = '${req.session.userid}'  order by date, time`, function(err, rows, fields) {
          if (err) {
                  res.send(err);
          }
          res.send(rows);
  });
});



app.get('/logele', function(req, res) {
  db.query(`select date, startwith, endwith, energy from elec_energy  where id='${req.session.userid}' order by date, startwith`, function(err, rows, fields) {
          if (err) {
                  res.send(err);
          }
          res.send(rows);
  });
});



app.get('/logdona', function(req, res) {
  db.query(`select date, time, energy, donateto from donate where id='${req.session.userid}' order by date, time`, function(err, rows, fields) {
          if (err) {
                  res.send(err);
          }
          res.send(rows);
  });
});



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
        db.query(`select id, name, address, phone, birth, message, nickname from user where id='${req.session.userid}'`, function(err, rows, fields){
                if(err){
                console.log(err);
                res.send(err);
        }
        res.send(rows);
        })
});


app.post('/modifyinfo', function(req, res){
        console.log(req.body);
        let{name, address, phone, birth, message, nickname} = req.body;
        console.log(birth);
        birth = Number(birth);
        db.query(`update user set name = '${name}', address = '${address}', phone = '${phone}', birth = ${birth}, message = '${message}', nickname = '${nickname}' where id = '${req.session.userid}'`, function(err, rows, fields) {
        if(err) {
                console.log(err);
                //res.send(false);
        }
        else {
                //res.send(true);
        }
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
    db.query(`select * from user where id='${id}'and passwd='${passwd}'`, function(err, rows, fields){
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
        else res.send(false);
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
  let {id, passwd, name, address, phone, birth, message, nickname} = req.body;
   birth = Number(birth);
    db.query(`insert into user(id, passwd, name, address, phone, birth, message, nickname)
      values('${id}', '${passwd}', '${name}', '${address}', '${phone}', ${birth}, '${message}', '${nickname}' )`, function(err, rows, fields){
        if(err) {
          console.log(err);
          res.send(false);
        }
        else{
          db.query(`insert into energy_amount(amount, id) values(0, '${id}')` ,function(err, rows, fiedls){
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
    db.query(` select * from (select *, @rank:=@rank+1 as rank from ( select u.name, u.id, u.nickname, u.message,  e.amount from energy_amount as e, user as u, (select @rank :=0) as r where e.id = u.id order by e.amount desc ) AS sum) as r where id='${req.session.userid}' or rank<11`, function(err, rows, fields){
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
      values('${id}', '${date}', '${time}', ${energy},  '${donateto}')`, function(err, rows, fields){
        if(err) {
          console.log(err);
          res.send(err);
        }
        else{
             db.query(`select * from energy_amount where id='${id}'`, function(err, rows, fields){
              if(err)
                res.send(err);
              else{
                uamount = rows[0].amount;
                db.query(`update energy_amount set amount=${uamount-energy} where id='${id}'`, function(err, rows, fields){
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
      values('${id}', '${date}', '${time}', ${energy},  '${address}')`, function(err, rows, fields){
        if(err) {
          console.log(err);
          res.send(err);
        }
        else{
          db.query(`select * from energy_amount where id='${id}'`, function(err, rows, fields){
            if(err)
              res.send(err);
            else{
              uamount = rows[0].amount;
              db.query(`update energy_amount set amount=${uamount-energy} where id='${id}'`, function(err, rows, fields){
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
        console.log(req.body);
  db.query(`insert into elec_energy(id, startwith, endwith, date, fid, energy)
    values('${id}', '${startwith}', '${endwith}', '${date}',  '${fid}',${energy})`, function(err, rows, fields){
      if(err) {
        console.log(err);
        res.send(err);
      }
      else{
        db.query(`select * from energy_amount where id='${id}'`, function(err, rows, fields){
          if(err){
            console.log(err);
            res.send(err);
          }
          else{
            uamount = rows[0].amount;
            db.query(`update energy_amount set amount=${uamount+energy} where id='${id}'`, function(err, rows, fields){
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

app.get('/myPlace', function(req,res){
        db.query(`select address from user where id='${req.session.userid}'`, function(err, rows, fields){
                if(err)
                res.send(err);
                else
                res.send(rows);
        })
});

app.get('/places', function(req,res){
        db.query(`select * from donatePlaces`, function(err, rows, fields){
                if(err)
                res.send(err);
                else
                res.send(rows);
        })
});
