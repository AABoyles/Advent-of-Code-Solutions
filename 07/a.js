var inputs = document.body.textContent.trim().split('\n');

var nodes = [];
var links = [];

inputs.forEach(input => {
  let parent = input.split(' (')[0];
  nodes.push(parent);
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

console.log(links);

var thisLink = links[0];
while(true){
  let nextLink = links.find(l => l.child == thisLink.parent);
  if(nextLink){
    thisLink = nextLink;
  } else {
    console.log(thisLink.parent);
    break;
  }
}
