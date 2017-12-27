var components = document.body.textContent.trim().split('\n').map(x => ({sides: x.split('/').map(parseFloat)}));
var n = components.length;
var strength = 0;
var strongest = 0;
var chain = [];

function DFS(endVal){
  for(let i = 0; i < n; i++){
    if(!components[i].used && components[i].sides.includes(endVal)){
      chain.push(components[i]);
      let otherVal = components[i].sides.filter(s => s !== endVal)[0];
      components[i].used = true;
      strength += (endVal + otherVal);
      if(strength > strongest) strongest = strength;
      DFS(otherVal);
      chain.slice(-1);
      components[i].used = false;
      strength -= (endVal + otherVal);
    }
  }
}

DFS(0);

console.log(strongest);

// Fuck it:

var input = document.body.textContent.trim();
var lengths = {};

function solve(arr) {
    var parts = populate(arr);
    var score = descend(parts, 0 /*starting value*/, 0 /*current score*/, {} /*visited*/, 0 /*length*/);
    console.log(score);
    console.log(lengths);
}

function descend(parts, cur, score, visited, length) {
    if (!parts[cur]) {
        score += cur;
        if (!lengths[length]) lengths[length] = [];
        lengths[length].push(score);
        return score;
    }

    var scores = [score];
    parts[cur].forEach((value, index) => {
        value = parseInt(value);
        if (visited[index]) return;
        var updated_visited = {};
        updated_visited[index] = true;
        var local_score = Math.max(score, descend(parts, value, score + value + cur, Object.assign({}, visited, updated_visited), length + 1));
        scores.push(local_score);
    });

    if (scores.length == 1) {
        if (!lengths[length]) lengths[length] = [];
        lengths[length].push(score);
        return score;
    }

    return scores.reduce((m, n) => m > n ? m : n, 0);
}

function populate(arr) {
    var parts = {};
    arr.forEach((part, index) => {
      var [a, b] = part.split('/').map(parseInt);
      parts = insert(parts, a, b, index);
      parts = insert(parts, b, a, index);
    });
    return parts;
}

function insert(parts, a, b, index) {
    if (!parts[a]) parts[a] = {};
    parts[a][b] = index;
    return parts;
}

solve(input.split('\n'));
