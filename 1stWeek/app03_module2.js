class Calc {
  minus(x, y) {
    return x - y;
  }
}

class Calc2 extends Calc {
  constructor() {
    super();
    console.log("Calc 생성자");
  }
  plus(x, y) {
    return x + y;
  }
}

module.exports = new Calc2();
