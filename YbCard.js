var makerjs = require('makerjs');

function dotted_line_x(a, b, y) {
  for (var i = a; i < b; i = i+2) {
    makerjs.$(new makerjs.paths.Line([i+0.3, y], [i+1, y])).addTo(this, "line");
  }
}

function dotted_line_y(a, b, x){
  for (var i = a; i < b; i = i+2) {
    makerjs.$(new makerjs.paths.Line([x, i+0.7], [x, i+1])).addTo(this, "line");
  }
}

function logo() {
  this.paths = {
    c1: new makerjs.paths.Circle([65, 90], 20)
  };
}

function man() {
  this.paths = {
    c1: new makerjs.paths.Circle([0, 40], 20)
  },
  this.models = {
    body: new makerjs.models.ConnectTheDots(true, [[-20,0],[-10,30],[10,30],[20,0]])
  };
}

function demo(font, text, font_size) {
  this.models = {
    boundary: new makerjs.models.RoundRectangle(200, 150, 5),
    goal_roof: makerjs.model.moveRelative(
      new makerjs.models.Rectangle(20,110), [20,20]),
    goal_front: makerjs.model.moveRelative(
      new makerjs.models.Rectangle(70,110), [50,20]),
    text: makerjs.model.moveRelative(
      makerjs.model.rotate(
        new makerjs.models.Text(font, text, font_size, false, [0,0]),
        90
      ),
      [190, 7]
    ),
    fold1: new dotted_line_x(40, 50, 20),
    fold2: new dotted_line_x(40, 50, 130),
    fold3: new dotted_line_y(0, 10, 100),
    fold4: new dotted_line_y(140, 150, 100),
    fold5: new dotted_line_y(130, 140, 20),
    fold6: new dotted_line_y(10, 20, 20),
    fold7: new dotted_line_y(10, 20, 120),
    fold8: new dotted_line_y(130, 140, 120),
    man: makerjs.model.move(makerjs.model.rotate(
      new man(),90), [120,60])
    //,logo: new logo()
  };

  this.paths = {
    line1: new makerjs.paths.Line([20, 10], [120, 10]),
    line2: new makerjs.paths.Line([20, 140], [120, 140])
  };

  this.units = makerjs.unitType.Millimeter;
}

demo.metaParameters = [
  { title: "font", type: "font", value: "*" },
  { title: "text", type: "text", value: "Casimir" },
  { title: "font size", type: "range", min: 10, max: 200, value: 36 }
];

module.exports = demo;
