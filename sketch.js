var generator;

function setup() {
  noCanvas();
  generator = new RiMarkov(2);
  generator.loadFrom('data/pattern-language.txt');
  var button = select('#button');
  button.mousePressed(generate);
}

function generate() {
  var output = select('#output');
  var sentences = generator.generateSentences(3);
  var text = "Design a space that reflects the following principles:" + "<ol><li>" + sentences.join("<li>") + "</ol>";
  output.html(text);
}
