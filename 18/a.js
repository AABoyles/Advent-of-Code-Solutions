const instruction = {
  snd: X      => lastSound = registers[X],
  set: (X, Y) => registers[X] = Y,
  add: (X, Y) => registers[X] += Y,
  mul: (X, Y) => registers[X] *= Y,
  mod: (X, Y) => registers[X] %= Y,
  rcv: X      => { if(X !== 0){ registers[X] = lastSound }},
  jgz: (X, Y) => { if(X > 0){ i += (Y - 1) }}
};

var input = document.body.textContent.trim().split('\n');

var registers = {};
var lastSound = 0;
var i = 0;

while(i < input.length){
  let command, args, X, Y;
  [command, ...args] = input[i].split(' ');
  X = args[0];
  if(! X in registers) registers[X] = 0;
  if(args.length > 1){
    if(/^-?[0-9]+$/.test(args[1])){
      Y = +args[1];
    } else {
      Y = +registers[args[1]];
    }
    instruction[command](X, Y);
  } else {
    instruction[command](X);
    if(command == 'rcv' && X > 0){
      console.log(lastSound);
      break;
    }
  }
  i++;
}

//Fuck it

function getVal(rs, v) {
  const num = parseInt(v)
  return isNaN(num) ? rs[v] : num
}

function solve1(n) {
  const rs = {}
  let sound = -1
  let i = 0
  n = n.split('\n').map(l => l.split(' '))

  loop: while (1) {
    const ins = n[i]
    switch (ins[0]) {
      case 'snd':
        sound = getVal(rs, ins[1])
        i++
        break
      case 'set':
        rs[ins[1]] = getVal(rs, ins[2])
        i++
        break
      case 'add':
        rs[ins[1]] += getVal(rs, ins[2])
        i++
        break
      case 'mul':
        rs[ins[1]] *= getVal(rs, ins[2])
        i++
        break
      case 'mod':
        rs[ins[1]] %= getVal(rs, ins[2])
        i++
        break
      case 'rcv':
        if (getVal(rs, ins[1]) !== 0) {
          break loop
        }
        i++
        break
      case 'jgz':
        if (getVal(rs, ins[1]) > 0) {
          i += getVal(rs, ins[2])
        } else {
          i++
        }
        break
    }
  }

  return sound
}

solve1(document.body.textContent.trim());
