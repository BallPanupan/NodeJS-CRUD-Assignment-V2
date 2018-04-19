// This is global routes file
const express = require('express')
const router = express.Router()
const todolistRoutes = require('../services/todolists/routes/router')
var Mongoose = require('mongoose')
var multer = require('multer');

router.use('/todolists', todolistRoutes)

//mongodb
var pkap_testSchema = new Schema({fname:String,lname:String,sex:String});
var pkap_tests = Mongoose.model("pkap_tests",pkap_testSchema);
var Schema = mongoose.Schema; //insert data
var Schema2 = mongoose.Schema;// post comment on page

router.get('/',function(req,res){
  res.render('Index')
  console.log("Index Page");
});

router.get('/insert',function(req,res){
  res.render('Insert')
  console.log("Insert Page");
});

//in view has delete
router.get('/views',function(req,res){
    pkap_tests.find('pkap_tests'.toArray,function(ree,result){
      console.log(result);
    res.render('view',{data:result});
  });
  console.log("view Page");

});

router.get('/update/:_id',function(req,res){
  //var _id=req.params._id;
  pkap_tests.findById(req.params._id,function(err, result){

    res.render('update',{data:result})
    console.log("\nview data for update");
    console.log(result);
    });
});

router.get('/delete/:_id',function(req,res) {
  pkap_tests.findById(req.params._id,function(err,pkap_tests){
    pkap_tests.remove();
  });
  res.redirect('/views')
});


//post
router.post('/insert',function(req,res){
  var users = new pkap_tests({
    fname : req.body.fname,
    lname : req.body.lname,
    sex : req.body.sex
  })
  users.save();
  res.redirect('/views')
});

router.post('/update',function(req, res){
  pkap_tests.findById(req.body._id,function(err, result){
    result.fname = req.body.fname;
    result.lname = req.body.lname;
    result.sex = req.body.sex;
    result.save();
  });
  res.redirect('../views');
});

module.exports = router
