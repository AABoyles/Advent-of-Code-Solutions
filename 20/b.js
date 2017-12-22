var input = document.body.textContent.trim().split('\n');

var particles = input.map(l => {
  let particle = {}, p, v, a;
  [p, v, a] = l.split(', ').map(x => x.slice(3, -1));
  particle.position = p.split(',').map(parseFloat);
  particle.velocity = v.split(',').map(parseFloat);
  particle.acceleration = a.split(',').map(parseFloat);
  particle.rm = false;
  return particle;
});

function arrayEquals(a, b){
  for(let i = 0; i < a.length; i++){
    if(a[i] != b[i]) return false;
  }
  return true;
}

function removeCollisions(){
  for(let i = 0; i < particles.length; i++){
    for(let j = 0; j < i; j++){
      if(arrayEquals(particles[i].position, particles[j].position)){
        particles[i].rm = true;
        particles[j].rm = true;
      }
    }
  }
  particles = particles.filter(p => !p.rm);
}

function tick(){
  particles.forEach((particle, i) => {
    particle.velocity[0] += particle.acceleration[0];
    particle.velocity[1] += particle.acceleration[1];
    particle.velocity[2] += particle.acceleration[2];
    particle.position[0] += particle.velocity[0];
    particle.position[1] += particle.velocity[1];
    particle.position[2] += particle.velocity[2];
  });
  removeCollisions();
  console.log(particles.length);
}

for(let i = 0; i < 100000; i++) tick();
