inputs = document.body.textContent.trim().split('\n');

checksum = 0;

inputs.forEach(input => {
  let vals = input.split('\t').map(parseFloat);
  checksum += Math.max(...vals) - Math.min(...vals);
});

console.log(checksum);
