const Book = require('./book.js');
var Discount = require('./discount.js');
const mongoManager = require('./mongoManager.js');


var allBooks = [];
// var allDiscounts = [];

//could use a Date object for the year instead of an int
allBooks.push(new Book("Moby Dick", 2000, 15.20));
allBooks.push(new Book("The Terrible Privacy of Maxwell Sim", 2010, 13.14));
allBooks.push(new Book("Still Life With Woodpecker", 1980, 11.05));
allBooks.push(new Book("Sleeping Murder", 1976, 10.24));
allBooks.push(new Book("Three Men in a Boat", 1889, 12.87));
allBooks.push(new Book("The Time Machine", 1895, 10.43));
allBooks.push(new Book("The Caves of Steel", 1954, 8.12));
allBooks.push(new Book("Idle Thoughts of an Idle Fellow", 1886, 7.32));
allBooks.push(new Book("A Christmas Carol", 1843, 4.23));
allBooks.push(new Book("A Tale of Two Cities", 1859, 6.32));
allBooks.push(new Book("Great Expectations", 2000, 13.21));
//
// allDiscounts.push(new Discount("Books after year 2000", 0.10));
// allDiscounts.push(new Discount("Over £30 deal", 0.05));

module.exports = {
  allBooks //,
  //allDiscounts
}
