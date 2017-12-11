var steps = document.body.textContent.trim().split(',');

var distances = {
  'n': 0,
  's': 0,
  'ne': 0,
  'nw': 0,
  'se': 0,
  'sw': 0
};
var ops = {
  'n': 's',
  's': 'n',
  'se': 'nw',
  'nw': 'se',
  'sw': 'ne',
  'ne': 'sw'
}
var stepsAway = 0;

steps.forEach(step => {
  distances[step]++;
  if(distances[step] > distances[ops[step]]) stepsAway++;
  else stepsAway--;
});

console.log(stepsAway);

// Gave up.

var dirs = {
  'n': [-1,1,0],
  'ne': [0,1,-1],
  'se': [1,0,-1],
  's': [1,-1,0],
  'sw': [0,-1,1],
  'nw': [-1,0,1]
};

var coords = [0,0,0],
    max = -Infinity,
    distance = (x => x.map(Math.abs).reduce((a,b) => a > b ? a : b));

for (let d of steps) {
  coords = coords.map( (x,i) => x + dirs[d][i] )
  max = Math.max(max, distance(coords))
}
console.log(distance(coords), max);

//Got close though :(
