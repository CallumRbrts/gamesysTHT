var express = require('express');
var app = express();
//var {user, password, dbname, secretKey, apiKey, searchAPIkey} = require('./config.json');
const mongoManager = require('./js/mongoManager.js');
//needed here due to threading issues
mongoManager.emptyCollection('books');
mongoManager.emptyCollection('discounts');

const expressValidator = require('express-validator');
var session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8000;
//const uri = "mongodb+srv://"+user+":"+password+"@web-entreprise-systems.enfbr.mongodb.net/"+dbname+"?retryWrites=true&w=majority";
var port = PORT;

const Book = require('./js/book.js');
const Discount = require('./js/discount.js');


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

// async function init(){
//   await mongoManager.emptyCollection('books');
//   await mongoManager.emptyCollection('discounts');
// }
// init().then(async function(){
//   await mongoManager.addToDB('discounts', allDiscounts);
//   await mongoManager.addToDB('books', allBooks);
// });



// mongoManager.emptyCollection('books');
// mongoManager.emptyCollection('discounts');


const calculateTotal = require('./js/calculateTotal.js');




//Use to load static files like css
app.use(express.static(__dirname));
//app.use(cookieParser());
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



app.route('/')
  .get(function (req,res){


      res.render(__dirname+'/index.ejs',{
        checkboxes: checkboxes
      });
    //console.log(recipes);
    //const tagline = '<div class="col-md-6 col-lg-4 mb-5"><div class="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal1"><div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100"><div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div></div><img class="img-fluid" src="assets/img/portfolio/cabin.png" alt="" /></div></div>';
  })
  .post(function(req,res){
    var bookArray = req.body.bookArray;
    console.log(bookArray);
    bookArray = bookArray.split(',')
    //change to get only selected ones
    var bookObjects = []
    for (var j=0; j < bookArray.length; ++j){
      for (var i=0; i < allBooks.length; ++i) {
          if (allBooks[i].name === bookArray[j]) {
              bookObjects.push(allBooks[i]);
          }
      }
    }
    console.log(bookObjects);
    var dis = new Discount("Books after year 2000", 0.10);
    var total = calculateTotal.calcTotal(bookObjects,dis);
    console.log(total);
    var final = calculateTotal.discountTotal(total, 0.05, 30);
    console.log(final.toFixed(2));



    // mongoManager.getFromDB('books', function(result){
    //
    //   console.log(result);
    //   let dis = new Discount("Books after year 2000", 0.10)
    //   let total = calculateTotal.calcTotal(result, dis);
    //   let finalPrice = calculateTotal.discountTotal(total, 0.05, 30);
    //   console.log(finalPrice);
    //   res.render(__dirname+'/index.ejs',{
    //     checkboxes: checkboxes,
    //     finalPrice: finalPrice
    //   });
    //
    // });

  });


// app.get( '/', function( req, res ) {
//   res.sendFile( path.join( __dirname, 'css', 'index.html' ));
// });


app.listen(PORT);
console.log('Express server running at http://127.0.0.1:'+PORT+'/');
