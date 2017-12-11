//...Didn't even attept part 2. https://github.com/varbrad/aoc17-js/tree/master/day10

const SIZE = 256;
const inputStr = document.body.textContent;
const input = inputStr.split('')
    .map(c => c.charCodeAt(0))
    .concat(17,31,73,47,23);
const range = [...Array(SIZE).keys()];

const tranformPos = (p,start) => (p - start + SIZE) % SIZE;
const getMutFn = (curr, l) => (old) => {
    let posFromStart = tranformPos(old, curr);
    if(posFromStart >= l)return old;
    let newPosFromStart = l-posFromStart-1;
    let res = tranformPos(newPosFromStart, -curr);
    return res;
}
var transforms = [];
var skip = 0;
var curr = 0;
for(var round = 0; round<64;round++){
    for (const l of input) {
        transforms.push(getMutFn(curr, l));
        curr = (curr + l + skip) % SIZE;
        skip++;
    }
}
const fullTransform = (p) => transforms.reduce((a,f)=>f(a), p);
const sparse = range.map(i => { return {val:i, pos:fullTransform(i)};})
    .sort((p1,p2) => p1.pos-p2.pos)
    .map(p => p.val);

Array.prototype.chunk = function ( n ) {
    if ( !this.length ) {
        return [];
    }
    return [ this.slice( 0, n ) ].concat( this.slice(n).chunk(n) );
};

const bytes = sparse.chunk(16)
    .map(ch => ch.reduce((a,v) => a ^ v, 0))
    .map(b => b.toString(16));
console.log(bytes.join(''));
