var input = document.body.textContent.trim().split('\n');
var tape = {};
var cursor = 0;
var state = "A";

for(let steps = 0; steps < 12481997; steps++){
  if(typeof tape[cursor] === 'undefined') tape[cursor] = 0;
  if(state === "A"){
    if(tape[cursor] === 0){
      tape[cursor] = 1
      cursor++;
      state = "B";
    } else {
      tape[cursor] = 0;
      cursor--;
      state = "C";
    }
    continue;
  }

  if(state === "B"){
    if(tape[cursor] === 0){
      tape[cursor] = 1
      cursor--;
      state = "A";
    } else {
      tape[cursor] = 1
      cursor++;
      state = "D";
    }
    continue;
  }

  if(state === "C"){
    if(tape[cursor] === 0){
      tape[cursor] = 0;
      cursor--;
      state = "B";
    } else {
      tape[cursor] = 0;
      cursor--;
      state = "E";
    }
    continue;
  }

  if(state === "D"){
    if(tape[cursor] === 0){
      tape[cursor] = 1
      cursor++;
      state = "A";
    } else {
      tape[cursor] = 0;
      cursor++;
      state = "B";
    }
    continue;
  }

  if(state === "E"){
    if(tape[cursor] === 0){
      tape[cursor] = 1
      cursor--;
      state = "F";
    } else {
      tape[cursor] = 1
      cursor--;
      state = "C";
    }
    continue;
  }

  if(state === "F"){
    if(tape[cursor] === 0){
      tape[cursor] = 1
      cursor++;
      state = "D";
    } else {
      tape[cursor] = 1
      cursor++;
      state = "A";
    }
    continue;
  }
}

console.log(Object.values(tape).reduce((a,b) => a+b, 0));
