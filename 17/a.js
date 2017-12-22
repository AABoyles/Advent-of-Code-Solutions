var input = 304;
var position = 0;
var buffer = [0];
for(var i = 1; i <= 2017; i++){
  position = (position + input % i + 1) % i;
  buffer.splice(position, 0, i);
}
console.log(buffer[buffer.indexOf(2017) + 1]);
