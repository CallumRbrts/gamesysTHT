module.exports = {
  calcTotal: function(books){
    var total = 0;
    for(var i = 0; i < books.length; ++i){
      total += books[i].calcPrice();
    }
    console.log(total);
  },
  discountTotal: function(price, discount, threshold){
    if(price > threshold){
      let reducedPrice = discount*price
      return price - reducedPrice;
    }
    return price;
  }
}
