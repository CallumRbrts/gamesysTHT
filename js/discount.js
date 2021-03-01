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

}

module.exports = Discount;

//potentially create an extends class thing to then override the apply discount function
//instead of using calculateTotal.discountTotal
