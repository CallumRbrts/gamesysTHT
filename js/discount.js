class Discount{

  constructor(name, percentage){
    this.name = name;
    this.percentage = percentage;
  }

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
