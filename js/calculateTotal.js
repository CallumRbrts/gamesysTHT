module.exports = {
  calcTotal: function(books, discount){
    var total = 0;
    for(var i = 0; i < books.length; ++i){
      //total += books[i].calcPrice();
      total += discount.applyDiscount(books[i]);
      //total += books[i].calcPrice(discount.percentage);
    }
    return total;
  },
  discountTotal: function(price, discount, threshold){
    if(price > threshold){
      let reducedPrice = discount*price;
      return (price - reducedPrice);
    }
    return price;
  }
}
