var input = 304;
var position = 0;
var oneth = 1;
for(var i = 1; i <= 50000000; i++){
  position = (position + input % i + 1) % i;
  if(position === 0) oneth = n;
}
console.log(oneth);
