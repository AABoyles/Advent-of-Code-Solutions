var input = document.body.textContent.trim().split('\n');

var particles = input.map(l => {
  let particle = {}, p, v, a;
  [p, v, a] = l.split(', ').map(x => x.slice(3, -1));
  particle.position = p.split(',').map(parseFloat);
  particle.velocity = v.split(',').map(parseFloat);
  particle.acceleration = a.split(',').map(parseFloat);
  return particle;
});

function tick(){
  let minDistance = Infinity;
  let closestIndex = 0;

  particles.forEach((particle, i) => {
    particle.velocity[0] += particle.acceleration[0];
    particle.velocity[1] += particle.acceleration[1];
    particle.velocity[2] += particle.acceleration[2];
    particle.position[0] += particle.velocity[0];
    particle.position[1] += particle.velocity[1];
    particle.position[2] += particle.velocity[2];
    particle.distance = Math.abs(particle.position[0]) + Math.abs(particle.position[1]) + Math.abs(particle.position[2]);
    if(minDistance > particle.distance){
      minDistance = particle.distance;
      closestIndex = i;
    }
  });
  console.log(closestIndex);
}

while(true) tick();
