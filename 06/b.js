var inputs = document.body.textContent.trim().split('\t').map(parseFloat);
var states = [];
var steps = 0;

function str(inputs){
  let out = "";
  inputs.forEach(entry => {
    if((entry+"").length == 1){
      out += "0"+entry;
    } else {
      out += entry;
    }
  });
  return out;
}

while(!states.includes(str(inputs))){
  states.push(str(inputs));
  let largest = Math.max(...inputs);
  let loc = inputs.indexOf(largest);
  inputs[loc] = 0;
  for(var i = 1; i <= largest; i++){
    inputs[(loc + i) % 16]++;
  }
  steps++;
}

console.log(steps);
console.log(steps - states.indexOf(str(inputs)));
