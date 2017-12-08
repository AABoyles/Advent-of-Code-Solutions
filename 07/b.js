var inputs = document.body.textContent.trim().split('\n');

var nodes = [];
var links = [];

inputs.forEach(input => {
  let parent = input.split(' (')[0];
  let weight = parseFloat(input.split(/[()]/)[1]);
  nodes.push({
    id: parent,
    weight: weight
  });
  let children = input.split(' -> ')[1];
  if(children){
    children.split(', ').forEach(child => {
      links.push({
        parent: parent,
        child : child
      });
    });
  }
});

links.forEach(l => {
  l.parent = nodes.find(d => d.id == l.parent);
  l.child  = nodes.find(d => d.id == l.child);
});

var getChildren = node => links.filter(l => l.parent.id == node.id).map(l => l.child);
var sum = contents => contents.reduce((a, b) => a + b, 0);

//Known from Part 1
var root = nodes.find(d => d.id == 'azqje');

function traverse(node){
  let children = getChildren(node);
  if(children){
    return sum(children.map(traverse));
  } else {
    return node.weight;
  }
}

traverse(root);

//About this point I got fed up with attempting to structure the problem and decided to cheat instead.
//Here is [/u/peasant-trip](https://www.reddit.com/user/peasant-trip)'s [solution](https://www.reddit.com/r/adventofcode/comments/7i44pg/2017_day_7_solutions/dqw6yxc/)

const input = document.body.textContent.trim().split('\n');
const parse = s => s.match(/(\w+) \((\d+)\)(?: -> (.+))?/);
const towerMap = input.map(parse).reduce((o, [, key, w, nodes]) =>
    Object.assign(o, { [key]: { key, w: +w, nodes: nodes && nodes.split(', ') } }), {});
const towers = Object.values(towerMap);
const isNotAParentOf = ({ key }) => ({ nodes }) => !nodes || !nodes.includes(key);
const head = towers.filter(t => towers.every(isNotAParentOf(t)))[0];

// Only for arrays with at least 2 elements and only one outlier
const getNorm = ([x, y, z]) => (x === y ? x : z);
const findOutlier = a => (norm => ({ i: a.findIndex(x => x !== norm), norm }))(getNorm(a));
const sum = a => a.reduce((acc, x) => acc + x, 0);
const correctError = ({ w, nodes }) => {
    if (!nodes) return [w, 0];
    const rec = nodes.map(key => correctError(towerMap[key]));
    const ws = rec.map(res => res[0]);
    const fix = (rec.find(res => res[1]) || [])[1] || 0;
    const { i, norm } = findOutlier(ws);
    if (fix || i < 0 || !norm) return [w + ws[0] * ws.length, fix]; // weights are already fixed
    return [w + sum(ws) + norm - ws[i], towerMap[nodes[i]].w + norm - ws[i]];
};
