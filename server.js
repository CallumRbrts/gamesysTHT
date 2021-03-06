var express = require('express');
var app = express();
const mongoManager = require('./js/mongoManager.js');
const expressValidator = require('express-validator');
var session = require('express-session');
const PORT = process.env.PORT || 8000;
var port = PORT;
const Book = require('./js/book.js');
const Discount = require('./js/discount.js');
const CustomDiscount = require('./js/discounts/customDiscount.js');

var {allBooks} = require('./js/factory.js'); //, allDiscounts

//initializes checkboxes for every book
//can also be done with a DB call
function initCheckboxes(){
  var checkboxes = [];
  for(var i = 0; i < allBooks.length; ++i){

    var checkbox = '<li class="list-group-item rounded-0"><div class="custom-control custom-checkbox"><input class="custom-control-input bookCheckbox" id="check'+i+'" type="checkbox" value="'+allBooks[i].name+'"><label class="cursor-pointer d-block custom-control-label" for="check'+i+'">'+allBooks[i].name +" ("+ allBooks[i].year + ") £"+ allBooks[i].price+'</label></div></li>'

    checkboxes.push(checkbox);

  }
  return checkboxes;
}
const checkboxes = initCheckboxes();

//empty the collection then fill it
//factory.js would ideally not exist, the aim is to show what is added to the DB and also potentially create more books
function init(){
  mongoManager.emptyCollection('books', function(){
    mongoManager.addToDB('books', allBooks);
  });
}
init()

const calculateTotal = require('./js/calculateTotal.js');


//Use to load static files like css
app.use(express.static(__dirname));
app.use(session({
  name: 'session',
  resave: true,
  saveUninitialized: true,
  secret: "secretKey",
 }));
app.set('view engine', 'ejs');
//since the content type of our form is set to x-www-form-urlencoded we need to add this
app.use(express.urlencoded({
  extended: true
}));

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

    //uncomment this if you want to bypass DB
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
    // let priceOver30 = new CustomDiscount("Price over £30", 0.05);
    // let finalPrice = priceOver30.discountTotal(total, 30);
    // console.log(finalPrice.toFixed(2));


    //comment this if you want to bypass DB
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
      let booksAfter2000 = new Discount("Books after year 2000", 0.10)
      let total = calculateTotal.calcTotal(bookObjects, booksAfter2000);
      let priceOver30 = new CustomDiscount("Price over £30", 0.05);
      let finalPrice = priceOver30.discountTotal(total, 30);
      console.log("The Total Price is: " + toFixed(finalPrice, 2));
      res.send("The Total Price is: £" + toFixed(finalPrice, 2));
    });
  });

// Referenced from answer: https://stackoverflow.com/questions/4187146/truncate-number-to-two-decimal-places-without-rounding
function toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

app.listen(PORT);
console.log('Express server running at http://127.0.0.1:'+PORT+'/');
