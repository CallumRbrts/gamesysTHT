class Book {

  constructor(name, year, price){
    this.name = name;
    this.year = year;
    this.price = price;
  }

  calcPrice(discount){
    if(this.year > 2000){
      let reducedPrice = discount*this.price
      //test if toFixed works
      return (this.price - reducedPrice).toFixed(2);
    }else{
      return this.price
    }
  }
}

module.exports = Book;
