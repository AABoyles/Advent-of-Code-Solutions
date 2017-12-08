var instructions = document.body.textContent.trim().split('\n');
var registers = {};
const comparators = {
  ">": (a,b) => a > b,
  "<": (a,b) => a < b,
  ">=": (a,b) => a >= b,
  "<=": (a,b) => a <= b,
  ">": (a,b) => a > b,
  "==": (a,b) => a == b,
  "!=": (a,b) => a != b
};
instructions.forEach(instruction => {
  let register, direction, value, temp, cregister, operator, bound;
  [register, direction, value, temp, cregister, operator, bound] = instruction.split(' ');
  if(!registers[register]){
    registers[register] = 0;
  }
  if(!registers[cregister]){
    registers[cregister] = 0;
  }
  if(comparators[operator](registers[cregister], parseFloat(bound))){
    registers[register] += (direction == 'inc' ? 1 : -1) * value;
  }
});
let max = -1000000000000;
for(r in registers){
  if(registers[r] > max){
    max = registers[r];
  }
}
console.log(max);
