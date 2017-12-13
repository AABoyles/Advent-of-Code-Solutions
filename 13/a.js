var inputs = document.body.textContent.trim().split('\n');
var maxRange = parseFloat(inputs[inputs.length - 1].split(': ')[0]);
var layers = Array(maxRange).fill(0);
inputs.forEach(input => {
  let depth, range;
  [depth, range] = input.split(': ').map(parseFloat);
  layers[depth] = range;
});
var scanners = Array(maxRange).fill(0);
var severity = 0;

for(var i = 0; i < maxRange; i++){
  if(scanners[i] === 0 && layers[i] > 0) severity += i*layers[i];
  scanners.forEach((scanner, j) => {
    if(layers[j] > 0) scanners[j] = (scanners[j] + 1) % layers[j];
  });
}

console.log(severity);

//Got Frustrated, gave up. Copied this solution: https://www.reddit.com/r/adventofcode/comments/7jgyrt/2017_day_13_solutions/dr6cwwv/

var guards = inputs.map(s => s.match(/\d+/g).map(Number));
var caughtByGuard = delay => ([d, r]) => (delay + d) % (2 * (r - 1)) === 0;
var severity = delay => guards.filter(caughtByGuard(delay)).reduce((n, [d, r]) => n + d * r, 0);

let delay = -1;
while (guards.some(caughtByGuard(++delay)));
console.log([severity(0), delay]);
