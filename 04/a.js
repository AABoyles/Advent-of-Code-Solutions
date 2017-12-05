const jetpack = require('fs-jetpack');

var valid = 0;
jetpack.read('input.txt').split('\n').forEach(line => {
  let words = line.split(' ');
  let distinct = new Set(words);
  if(words.length === distinct.size){ valid++; }
});

console.log(valid);
