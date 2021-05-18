const express = require('express');
const app = express();
const http = require('http').Server(app);
const mysql = require('mysql');
const bodyParser = require('body-parser');

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



app.get('/test', function(req,res){
    db.query('select * from user', function(err, rows, fields){
        if(err) {
        	console.log(err);
        	res.send(err);
        }
        console.log(rows);
        res.send(rows);
    })
});

app.post('/login', function(req,res){
  let {id, passwd} = req.body;
    db.query(`select * from user where id='${id}', passwd='${passwd}'`, function(err, rows, fields){
        if(err)
        {
            res.send("login db error");
        }
        else{
          if(rows[0].passwd == passwd)
            res.send(rows);
          else
            res.send(false);
        }
    })
});

app.post('/register', function(req,res){
  console.log(req.body);
  let {id, passwd, name, address, phone, age, message, nickname} = req.body;
  age = Number(age);
    db.query(`insert into user(id, passwd, name, address, phone, age, message, nickname)
      values('${id}', '${passwd}', '${name}', '${address}', '${phone}', ${age}, '${message}', '${nickname}' )`, function(err, rows, fields){
        if(err) {
          console.log(err);
          res.send(err);
        }
        else{
          db.query(`insert into energy_amount(amount, id) values(0, '${id}')` ,function(err, rows, fiedls){
            if(err) {
              console.log(err);
              res.send(err);
          }
          else
            res.send(true);
        })
      }
}  )
      });

app.get('/userinfo', function(req,res){
        db.query(`select id, name, address, phone, age, message, nickname from user`, function(err, rows, fields){
                if(err){
                console.log(err);
                res.send(err);
        }
        res.send(rows);
        })
});

app.get('/rank', function(req,res){
    db.query(`select e.amount, u.nickname, u.message from energy_amount as e, user as u where e.id = u.id order by e.amount desc limit 10`, function(err, rows, fields){
        if(err) {
        	console.log(err);
        	res.send(err);
        }
        res.send(rows);
    })
});

app.post('/donate', function(req,res){
    let { id, date, time, energy, donateto} = req.body;
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
    let { id, date, time, energy, address} = req.body;
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
  console.log(req.body);
  if(req.body=={}) res.send('.');
  let { id, startwith, endwith, date, energy, fid} = req.body;
  let uamount = 0;
  energy = Number(energy);
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
