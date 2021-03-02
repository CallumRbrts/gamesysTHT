class Discount{

  constructor(name, percentage){
    this.name = name;
    this.percentage = percentage;
  }
  //example discountTotal to demonstrate polymorphism in customDiscount
  discountTotal(price){
    let reducedPrice = this.percentage*price;
    return (price - reducedPrice);
  }

  //applies discount if year of book is over 2000
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
