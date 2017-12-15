var genA = 703;
var genB = 516;
var factorA = 16807;
var factorB = 48271;
var denominator = 2147483647;
var matches = 0;

var toBin = int => int.toString(2).slice(-16);

for(var i = 0; i < 40000000; i++){
  genA = genA * factorA % denominator;
  genB = genB * factorB % denominator;
  if(toBin(genA) === toBin(genB)) matches++;
  if(i % 1000000 == 0) console.log(matches);
}

console.log(matches);
