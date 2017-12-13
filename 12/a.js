var input = document.body.textContent.trim().split('\n');
var accessible = new Set();

function dfs(row){
  let nextRows = row.split(' <-> ').pop().split(', ').map(parseFloat);
  nextRows.forEach(r => {
    if(accessible.has(r)) return;
    accessible.add(r);
    dfs(input[r]);
  });
}

dfs(input[0]);
console.log(accessible.size);
