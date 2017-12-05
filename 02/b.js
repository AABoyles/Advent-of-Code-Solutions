inputs = document.body.textContent.trim().split('\n');

checksum = 0;

inputs.forEach(input => {
  let vals = input.split('\t').map(parseFloat);
  vals.forEach((v1, i) => {
    vals.forEach((v2, j) => {
      if((i !== j) && ((v1 % v2) === 0)){
        checksum += v1/v2;
      }
    });
  });
});

console.log(checksum);
