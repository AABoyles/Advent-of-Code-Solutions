var lengths = document.body.textContent.split(',').map(parseFloat);
var list = Array(256);
for(var i = 0; i < list.length; i++){ list[i] = i; }
var currentPosition = 0, skipSize = 0;

lengths.forEach(length => {
  let subList = list, overflow = 0;
  //The max length is 255, so the list can overflow once, meaning this is fine:
  if(length + currentPosition > list.length){
    subList = list.concat(list);
    overflow = length + currentPosition - list.length;
  }
  //...If it weren't, we could use a while loop instead.
  subList = subList.slice(currentPosition, length);
  subList.reverse();
  if(length > list.length - currentPosition){
    let clone = list.slice();
    clone.splice(currentPosition);
    list = list.concat(subList);
  } else {
    list = list.concat(subList);
  }

  currentPosition = (currentPosition + length + skipSize++) % 256;
});


//...And I gave up. https://github.com/varbrad/aoc17-js/tree/master/day10

function hash(list, ins, i, skip) {
  const l = list.length
  ins.forEach(v => {
    ;[...Array(v).keys()]
      .map((o, k) => list[(k + i) % l])
      .reverse()
      .forEach((val, k) => (list[(k + i) % l] = val))
    //
    i += v + skip
    skip++
  })
  return [list, i, skip]
}

function solve1(l, n) {
  let [list] = hash([...Array(l).keys()], n.split(',').map(Number), 0, 0)
  return list[0] * list[1]
}

solve1(256, document.body.textContent)
