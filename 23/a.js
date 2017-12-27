var registers = {a:0, b:0, c:0, d:0, e:0, f:0, g:0, h:0};
var toNum = (thing) => isNaN(parseFloat(thing)) ? registers[thing] : parseFloat(thing);

var i = 0;
var instruction = {
  set: (X, Y) => registers[X]  = toNum(Y),
  sub: (X, Y) => registers[X] -= toNum(Y),
  mul: (X, Y) => registers[X] *= toNum(Y),
  jnz: (X, Y) => toNum(X) !== 0 ? (i += toNum(Y)-1) : null
};

var input = document.body.textContent.trim().split('\n');

var multiplies = 0;

while(i < input.length){
  let command, X, Y;
  [command, X, Y] = input[i].split(' ');
  if(command === 'mul') multiplies++;
  instruction[command](X, Y);
  i++;
}

console.log(multiplies);
