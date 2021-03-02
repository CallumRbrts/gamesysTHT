class Discount{

  constructor(name, percentage){
    this.name = name;
    this.percentage = percentage;
  }
  //try to create function in constructor as variable
  //as a final
  discountTotal(price){
    let reducedPrice = this.percentage*price;
    return (price - reducedPrice);
  }

  applyDiscount(book){
    if(book.year > 2000){
      let reducedPrice = this.percentage*book.price;
      return (book.price - reducedPrice);
    }else{
      return book.price;
    }
  }

}

module.exports = Discount;

//potentially create an extends class thing to then override the apply discount function
//instead of using calculateTotal.discountTotal
