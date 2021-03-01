class Book {

  constructor(name, year, price){
    this.name = name;
    this.year = year;
    this.price = price;
  }
  
  //should be moved to discount class
  calcPrice(discount){
    if(this.year > 2000){
      let reducedPrice = discount*this.price;
      return (this.price - reducedPrice);
    }else{
      return this.price;
    }
  }
}

module.exports = Book;
