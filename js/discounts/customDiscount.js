const Discount = require('../discount.js');

class CustomDiscount extends Discount{
  discountTotal(price, threshold){
    if(price > 30){
      let reducedPrice = this.percentage*price;
      return (price - reducedPrice);
    }
    return price;
  }
}

module.exports = CustomDiscount;
