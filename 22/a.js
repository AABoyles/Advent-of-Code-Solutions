var grid = document.body.textContent.trim().split('\n').map(l => l.split(''));
var cells = {};
grid.forEach((row, i) => {
  cells[i] = {};
  row.forEach((cell, j) => {
    cells[i][j] = cell;
  });
});
var row = (grid.length-1)/2;
var col = (grid[0].length-1)/2;
var direction = 'n';
var flips = 0;

function turnRight(){
  if(direction === 'n'){ direction = 'e' }
  else if(direction === 'e'){ direction = 's' }
  else if(direction === 's'){ direction = 'w' }
  else if(direction === 'w'){ direction = 'n' }
}

function turnLeft(){
  turnRight(); turnRight(); turnRight();
}

function move(){
  if(direction === 'n'){ row-- }
  else if(direction === 'e'){ col++ }
  else if(direction === 's'){ row++ }
  else if(direction === 'w'){ col-- }
}

for(let i = 0; i < 10000; i++){
  if(!cells[row]) cells[row] = {};
  if(cells[row][col] == '#'){
    turnRight();
    cells[row][col] = '.';
  } else {
    turnLeft();
    cells[row][col] = '#';
    flips++;
  }
  move();
}

console.log(flips);
