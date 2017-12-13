var input = document.body.textContent.trim().split('\n');
var visited = Array(input.length).fill(false);
var groups = 0;

function dfs(row){
  let nextRows = row.split(' <-> ').pop().split(', ').map(parseFloat);
  nextRows.forEach(r => {
    if(!visited[r]){
      visited[r] = true;
      dfs(input[r]);
    }
  });
}

while(visited.includes(false)){
  groups++;
  let nextUnvisited = visited.findIndex(v => !v);
  dfs(input[nextUnvisited]);
}

console.log(groups);
