module.exports = {
  //calculates total price of selected books
  calcTotal: function(books, discount){
    var total = 0;
    for(var i = 0; i < books.length; ++i){
      total += discount.applyDiscount(books[i]);
    }
    return total;
  }
}
