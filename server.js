var express = require('express');
var app = express();
const mongoManager = require('./js/mongoManager.js');
const expressValidator = require('express-validator');
var session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8000;
var port = PORT;
const Book = require('./js/book.js');
const Discount = require('./js/discount.js');
const CustomDiscount = require('./js/discounts/customDiscount.js');

var {allBooks, allDiscounts} = require('./js/factory.js');

function initCheckboxes(){
  var checkboxes = [];
  for(var i = 0; i < allBooks.length; ++i){

    var checkbox = '<div class="form-check"><input class="form-check-input bookCheckbox" type="checkbox" value="'+allBooks[i].name+'" id="check'+i+'"><label class="form-check-label" for="check'+i+'">'+allBooks[i].name +" ("+ allBooks[i].year + ") £"+ allBooks[i].price+'</label></div>';
    checkboxes.push(checkbox);

  }
  return checkboxes;
}
const checkboxes = initCheckboxes();

async function init(){
  await mongoManager.emptyCollection('books');
  await mongoManager.emptyCollection('discounts');
}
init().then(async function(){
  await mongoManager.addToDB('discounts', allDiscounts);
  await mongoManager.addToDB('books', allBooks);
});

const calculateTotal = require('./js/calculateTotal.js');




//Use to load static files like css
app.use(express.static(__dirname));
// app.use(cookieParser());
app.use(session({
  name: 'session',
  resave: true,
  saveUninitialized: true,
  secret: "secretKey",
 }));
app.set('view engine', 'ejs');
//app.use(express.json())
//since the content type of our form is set to x-www-form-urlencoded we need to add this
app.use(express.urlencoded({
  extended: true
}));

console.log(allBooks);
console.log(allDiscounts);

app.route('/result').get(function(req, res){
  res.sendFile(__dirname+'/result.html')
});

app.route('/')
  .get(function (req,res){
      res.render(__dirname+'/index.ejs',{
        checkboxes: checkboxes
      });
  })
  .post(function(req,res){
    var bookArray = req.body.bookArray;
    bookArray = bookArray.split(',');
    console.log(bookArray);

    //change to get only selected ones
    // var bookObjects = []
    // for (var j=0; j < bookArray.length; ++j){
    //   for (var i=0; i < allBooks.length; ++i) {
    //       if (allBooks[i].name === bookArray[j]) {
    //           bookObjects.push(allBooks[i]);
    //       }
    //   }
    // }
    // console.log(bookObjects);
    // var dis = new Discount("Books after year 2000", 0.10);
    // var total = calculateTotal.calcTotal(bookObjects,dis);
    // console.log(total);
    // var finalPrice = calculateTotal.discountTotal(total, 0.05, 30);
    // console.log(finalPrice.toFixed(2));

    mongoManager.getFromDB('books', function(result){

      console.log(result);
      var bookObjects = [];
      for (var i = 0; i < result.length; ++i) {
        for (var j = 0; j < bookArray.length; ++j) {
          if (result[i].name === bookArray[j]) {
              bookObjects.push(result[i]);
          }
        }
      }
      console.log(bookObjects);
      let dis = new Discount("Books after year 2000", 0.10)
      let total = calculateTotal.calcTotal(bookObjects, dis);
      let finalPrice = calculateTotal.discountTotal(total, 0.05, 30);
      console.log(finalPrice.toFixed(2));
      res.render(__dirname+'/index.ejs',{
        checkboxes: checkboxes,
        finalPrice: finalPrice
      });
    });
  });


app.listen(PORT);
console.log('Express server running at http://127.0.0.1:'+PORT+'/');
