var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dao = require('./io');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.redirect('public/index.html');
});

// End point for registering guns
app.post('/api/gunReg',(req,res)=>{
    var gun = {
      manufact: req.body.manf,
      regNo:req.body.gunRegNo,
      specA:req.body.gunSpecA,
      specB:req.body.gunSpecB,
      built : req.body.dateBuilt,
      status : 0
    };
    console.log(req.body);
    dao.writeItem(gun,'guns');
    res.redirect('../interactive-demo.html');
});

//End point for getting all guns
app.get('/api/getAllGuns',(req,res)=>{
    function getAllGuns(err, data) {
        if (data) {
            res.json(data);
        } else {
            console.log(err);
            next(err);
        };
  }
  dao.readItem(getAllGuns,'guns');
});


//end point for editing gun
app.get('/api/editGun',(req,res)=>{
    var action = parseInt(req.query.mode);
    dao.editItem({regNo:`${req.query.regNo}`},{status:action},'guns');
    res.redirect('../interactive-demo.html');
});



// --- mariam endpoints --

// --- Aditi & Malhar endpoints ---
app.get('/api/getReviews',(req,res)=>{
    function getAllReviews(err, data) {
        if (data) {
            res.json(data);
        } else {
            console.log(err);
            next(err);
        };
  }
  dao.readItem(getAllReviews,'reviews');
});

app.get('/api/getKeywords',(req,res)=>{
    function getAllKeyWords(err, data) {
        if (data) {
            res.json(data);
        } else {
            console.log(err);
            next(err);
        };
  }
  dao.readItem(getAllKeyWords,'keywords');
});

app.get('/api/addKeyword',(req,res)=>{
   var userKey = req.query.keyWord;
   var keywordCount = req.query.keywordCount;
   if(keywordCount!=0){
      console.log(`userKey: ${userKey} - count: ${keywordCount}`);
      dao.editItem({word:`${userKey}`},{count:keywordCount},'keywords');
   }else{
      console.log("Keyword is 0");
       dao.writeItem({word:`${userKey}`,count:'1'},'keywords');
   }
   res.send('ok');
});

// --- End Aditi endpoints

// --- malhar end points ---
app.post('/api/addReview',(req,res)=>{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var review = {
    author : req.body.author,
    review : req.body.review,
    datePosted : date,
  }

  console.log(review);
  dao.writeItem(review,'reviews');

    res.redirect('../reviews.html');
});

// --- end malhar endpoints

//Adding email to our newsletter
app.post('/api/addEmail',(req,res)=>{
  var userEmailId = req.body.user_email;
  console.log(`userEmail: ${userEmailId}`);

  if(userEmailId){
    var userContact = {
      email: userEmailId,
      events: false,
      other: false,
      news:false,
      active: true,
    };

    if(req.body.events){
      userContact.events=true;
    }

    if(req.body.other){
      userContact.other=true;
    }

    if(req.body.news){
      userContact.news=true;
    }

    dao.writeItem(userContact,'emails');
  }
    res.redirect('/');
});

//Getting single email of a user from
app.get('/api/getEmail',(req,res)=>{
    var userEmail = req.query.userEmail;

    function getEmail(err, data) {
        var result = null;
        if (data) {
        for(item of data){
          if (item.email == userEmail){
            result = item;
          }
        }
        res.json(result);
      } else {
        console.log(err);
        next(err);
      };
    }

    function getAllEmails(err,data){
        var result = null;
        if (data) {
          res.json(data);
        } else {
          console.log(err);
          next(err);
        };
    }

    if(userEmail){
      dao.readItem(getEmail,'emails',{email:userEmail});
    }else{
      dao.readItem(getAllEmails,'emails');
    }
});

//end point for editing email
app.get('/api/editEmail',(req,res)=>{
  console.log(req.query);
    var userContact = {email:req.query.email};
    userContact.events = req.query.events;
    userContact.other = req.query.other;
    userContact.news = req.query.news;
    userContact.active = req.query.active;
    console.log(userContact);
    dao.editItem({email:`${req.query.email}`},userContact,'emails');
});
 // =-----------------------===-=
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
