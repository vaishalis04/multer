var express = require('express');
var router = express.Router();
var multer = require("../utils/multer.js").single("fileupload")
var MEDIA = require("../model/imagemedia.js")
var fs = require("fs")

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/upload', function(req, res, next) {
  multer(req, res,  async function (err) {
if(err) throw err;
const data = new MEDIA({username: req.body.username, fileupload: req.file.filename})
await data.save()
res.redirect("/show")
  })

});



router.get('/show', async function(req, res, next) {
  try{
    const data = await MEDIA.find()
  res.render('show', {DATA: data});

  }catch(err){
    res.send(err)
  }
});



router.get('/delete/:id',  async function(req, res, next) {
try{
  const data = await MEDIA.findByIdAndDelete(req.params.id)
  fs.unlinkSync("./public/uploads/" + data.fileupload)
  res.redirect('/show');
}catch(err){
  res.send(err)
}
});


router.get('/update/:id',  async function(req, res, next) {
  try{
    const data = await MEDIA.findById(req.params.id)
    res.render('update', {update:data});
  }catch(err){
    res.send(err)
  }
  });


  router.post('/update/:id',  async function(req, res, next) {
    multer(req,res, async function(err){
if(err) throw err
try{
  const user = await MEDIA.findByIdAndUpdate(req.params.id, {username: req.body.username, fileupload: req.file.filename})
  res.redirect("/show")
}catch(err){
  res.send(err)
}
    })
    });
module.exports = router;










// try nd catch
// async
//await
// fat arrow function q banaya hi