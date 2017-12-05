inputs = document.body.textContent.trim().split('\n').map(parseFloat);

i = 0, steps = 0;

while(i >= 0 & i < inputs.length){
  i += inputs[i]++;
  steps++;
}
