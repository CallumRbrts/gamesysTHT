class Discount{

  constructor(name, percentage){
    this.name = name;
    this.percentage = percentage;
  }
  //
  // get name(){
  //   return this.name;
  // }
  // get percentage(){
  //   return this.percentage;
  // }
}
module.exports = Discount;

//potentially create an extends class thing to then override the apply discount function
//instead of using calculateTotal.discountTotal
