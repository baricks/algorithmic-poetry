var poem;
var lines;
var song;

var nouns = [];
var adjectives = [];
var verbs = [];

function preload() {
  lines = loadStrings('data/poetry.txt');
}

function setup() {
  noCanvas();

  // Add 5 random meditations
  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

  var directions = [
    meditations1.random(),
    meditations2.random(),
    meditations3.random(),
    meditations4.random(),
    meditations5.random()
  ]

var index = 0;
  $("#meditations").text(directions[0]);

  (function animate() {
  $("#meditations").fadeOut(10000, function() {
    index = (index + 1) % directions.length;
    this.textContent = directions[index];
    // $('#meditations').html(directions[i]);
    // ;
  }).fadeIn(10000, animate);
  })();

  //pick the random animal
    Array.prototype.random = function () {
      return this[Math.floor((Math.random()*this.length))];
    }
    var animal = [extinctSpecies.random()];

  // getPosTags returns an array of tags
  var params = {
    ignoreStopWords: true,
    ignoreCase: true,
    ignorePunctuation: true
  };
  counts = RiTa.concordance(lines.join(" "),
    params);
  for (var k in counts) {
    if (counts.hasOwnProperty(k)) {
      var tags = RiTa.getPosTags(k);
      if (tags[0] == 'nn') {
        nouns.push(k);
      }
      else if (tags[0] == 'jj') {
        adjectives.push(k);
      }
      else if (tags[0] == 'vb') {
        verbs.push(k);
      };
    }
  };

  // set up tracery grammar
    var syntax = {
    "poem": ["#line0#<p>#line1#<p>#line2#<p>#line3#<p>#line4#<p>#line5#<p>#line6#<p>#line7#<p>#line8#<p>#line9#"],
    "noun": nouns,
    "adjective": adjectives,
    "verb": verbs,
    "land": geographicFeatures,
    "finalAnimal": animal,
    "line0": stanza0,
    "line1": stanza1,
    "line2": stanza2,
    "line3": stanza3,
    "line4": stanza4,
    "line5": stanza5,
    "line6": stanza6,
    "line7": stanza7,
    "line8": stanza8,
    "line9": stanza9
  };

    var grammar = tracery.createGrammar(syntax);
    poem = grammar.flatten('#poem#');
    var output = select('#output');
    output.html(poem);

}
