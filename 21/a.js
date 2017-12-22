var inputs = document.body.textContent.trim().split('\n');
var rules2 = {};
var rules3 = {};
inputs.forEach((rule, i) => {
  let input, output;
  [input, output] = rule.split(' => ');
  if(i < 5) rules2[input] = output;
  else rules3[input] = output;
});

function gridify(string){
  return string.split('/').map(s => s.split(''));
}

function stringify(grid){
  return grid.map(b => b.join('')).join('/');
}

function flip(grid){
  let n = grid.length;
  let newgrid = grid.map(l => Array(n));
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      newgrid[i][j] = grid[n - i - 1][j];
    }
  }
  return newgrid;
}

function transpose(grid){
  let n = grid.length;
  let newgrid = grid.map(l => Array(n));
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      newgrid[i][j] = grid[j][i];
    }
  }
  return newgrid;
}

function rotate(grid){
  return flip(transpose(grid));
}

var pattern = gridify('.#./..#/###');

function enhance(grid, depth){
  if(!depth) depth = 1;
  let options = rules2;
  if(grid[0].length == 3){
    options = rules3;
  }
  if(options[stringify(grid)]){
    return options[stringify(grid)]
  } else if(depth == 4) {
    return enhance(flip(grid), 1)
  } else {
    return enhance(rotate(grid), depth + 1)
  }
}

for(let i = 0; i < 5; i++){
  let complete;
  if(pattern.split('/').pop().length % 2 == 0){
    //Split into 2-grids
    let newgrid = enhance(grid);
  } else {
    //Split into 3-grids
    let newgrid = enhance(grid);
  }
}
