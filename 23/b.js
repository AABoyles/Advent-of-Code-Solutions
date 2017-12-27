//Brute force solution

var registers = {a:1, b:0, c:0, d:0, e:0, f:0, g:0, h:0};
var toNum = (thing) => isNaN(parseFloat(thing)) ? registers[thing] : parseFloat(thing);

var i = 0;
var instruction = {
  set: (X, Y) => registers[X]  = toNum(Y),
  sub: (X, Y) => registers[X] -= toNum(Y),
  mul: (X, Y) => registers[X] *= toNum(Y),
  jnz: (X, Y) => toNum(X) !== 0 ? (i += toNum(Y)-1) : null
};

var input = document.body.textContent.trim().split('\n');


while(i < input.length){
  let command, X, Y;
  [command, X, Y] = input[i].split(' ');
  instruction[command](X, Y);
  i++;
}

console.log(registers[h]);

// Clever Solution: https://www.reddit.com/r/adventofcode/comments/7lms6p/2017_day_23_solutions/drnjld2/
// But read this explainer: https://www.reddit.com/r/adventofcode/comments/7lms6p/2017_day_23_solutions/drnl3gg/
const part2 = x => {
    let nonprimes = 0;
    for (let n = x; n <= x + 17000; n += 17) {
        let d = 2;
        while (n % d !== 0) d++;
        if (n !== d) nonprimes++;
    }

    return nonprimes;
};

const input = +document.body.textContent.match(/\d+/)[0]; // the first number
console.log(part2(input * 100 + 100000));
