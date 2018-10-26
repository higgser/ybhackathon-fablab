var makerjs = require('makerjs');

function dotted_line_y(x, a, b){
  for (var i = a; i < b; i = i+2) {
    makerjs.$(new makerjs.paths.Line([x, i+0.7], [x, i+1])).addTo(this, "line");
  }
}

function man() {
  this.models = {
    body: new makerjs.models.ConnectTheDots(true, [[-20,0],[-20,30],[20,30],[20,0]]),
    face: { paths: { c1: new makerjs.paths.Circle([0, 40], 25) }},
    top: makerjs.model.moveRelative(new makerjs.models.Rectangle(10, 45),[-5,50])
  };
  makerjs.model.combineUnion(this.models.body, this.models.face);
  makerjs.model.combineUnion(this.models.top, this.models.face);
}

function demo(font, text, font_size) {
  var hole = new makerjs.models.RoundRectangle(9, 12, 2);
  var grid = makerjs.layout.cloneToGrid(hole, 2, 8, 2);

  this.models = {
    boundary: new makerjs.models.RoundRectangle(200, 150, 2),
    //goal_roof: makerjs.model.moveRelative(
    //  new makerjs.models.Rectangle(20,110), [20,20]),
    goal_front: makerjs.model.moveRelative(
      new makerjs.models.Rectangle(70,110), [50,20]),
    text: makerjs.model.moveRelative(
      makerjs.model.rotate(
        new makerjs.models.Text(font, text, font_size, false, [0,0]),
        90
      ),
      [190, 7]
    ),
    grid: makerjs.model.moveRelative(grid,[20,20]),
    fold2: new dotted_line_y(20, 10, 140),
    //fold1: new dotted_line_y(20, 130, 140),
    fold3: new dotted_line_y(40, 10, 140),
    //fold4: new dotted_line_y(40, 130, 140),
    fold5: new dotted_line_y(100, 0, 10),
    fold6: new dotted_line_y(100, 140, 150),
    fold7: new dotted_line_y(120, 10, 20),
    fold8: new dotted_line_y(120, 130, 140),
    fold9: new dotted_line_y(50,65,75),
    fold10: new dotted_line_y(70,65,75),
    fold11: new dotted_line_y(140,50,90),
    man: makerjs.model.move(makerjs.model.rotate(
      new man(),90), [140,70])
  };
  makerjs.model.combineSubtraction(this.models.goal_front, this.models.man);

  this.paths = {
    line1: new makerjs.paths.Line([20, 10], [120, 10]),
    line2: new makerjs.paths.Line([20, 140], [120, 140]),
    line3: new makerjs.paths.Line([120, 50], [140, 50]),
    line4: new makerjs.paths.Line([120, 90], [140, 90])
  };

  this.units = makerjs.unitType.Millimeter;
}

demo.metaParameters = [
  { title: "font", type: "font", value: "*" },
  { title: "text", type: "text", value: "Casimir" },
  { title: "font size", type: "range", min: 10, max: 200, value: 36 }
];

module.exports = demo;
