var input = document.getElementsByClassName('puzzle-input')[0].textContent;
var grid = Array(128);
var used = 0;

function a2hex(str) {
  var arr = [];
  for (var i = 0, l = str.length; i < l; i ++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    arr.push(hex);
  }
  return arr.join('');
}

function h2b(hex){
  let bytes = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'a': '1010',
    'b': '1011',
    'c': '1100',
    'd': '1101',
    'e': '1110',
    'f': '1111'
  };
  return hex.split('').map(h => bytes[h]).join('');
}

grid.forEach((row, i) => {
  row = Array(128);
  console.log(h2b(a2hex(`${input}-${i}`)));
});

console.log(used);


//Oh, fuck it. https://www.reddit.com/r/adventofcode/comments/7jpelc/2017_day_14_solutions/dr87iba/

const sequence = [...Array(256).keys()];
const GRID_SIZE = 128
function part1(input) {
    const grid = Array(GRID_SIZE).fill(Array(GRID_SIZE).fill(0));
    let used = 0;
    for (let i = 0; i < GRID_SIZE; ++i) {
        const toHash = `${input}-${i}`;
        used += getKnotHash(toHash)
            .split("")
            .map(hexDigit => parseInt(hexDigit, 16).toString(2))
            .join("")
            .match(/1/g)
            .length;
    }
    return used;
}

function part2(input) {
    const grid = [];
    const INITIAL_GROUP_NUMBER = 2;
    let groupNumber = INITIAL_GROUP_NUMBER;
    for (let i = 0; i < GRID_SIZE; ++i) {
        const toHash = `${input}-${i}`;
        grid[i] = getKnotHash(toHash)
            .split("")
            .map(hexDigit => parseInt(hexDigit, 16).toString(2).padStart(4, "0"))
            .join("")
            .split("")
            .map(Number);
    }

    for (let rowNumber = 0; rowNumber < GRID_SIZE; ++rowNumber) {
        const row = grid[rowNumber];
        for (let columnNumber = 0; columnNumber < GRID_SIZE; ++columnNumber) {
            const column = row[columnNumber];
            let markedSomething = markGroup(groupNumber, grid, JSON.parse( JSON.stringify(rowNumber) ), JSON.parse( JSON.stringify(columnNumber) ));
            if (markedSomething) {
                ++groupNumber;
            }
        }
    }
    return groupNumber - INITIAL_GROUP_NUMBER;
}

function markGroup(groupNumber, grid, rowNumber, columnNumber) {
    let row = grid[rowNumber];
    if (row) {
        if (grid[rowNumber][columnNumber] === 1) {
            grid[rowNumber][columnNumber] = groupNumber;
            markGroup(groupNumber, grid, rowNumber - 1, columnNumber);
            markGroup(groupNumber, grid, rowNumber + 1, columnNumber);
            markGroup(groupNumber, grid, rowNumber, columnNumber - 1);
            markGroup(groupNumber, grid, rowNumber, columnNumber + 1);
            return true;
        }
    }
    return false;
}

function getKnotHash(input) {
    let position = 0;
    let skip = 0;
    input = input.split("").map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]);

    let knot = tieKnot(sequence, input, 64);

    return getHexForArray(getDenseHash(knot));
}
function tieKnot(input, lengths, rounds = 1) {
    let result = input.slice();
    let position = 0;
    let skip = 0;

    for (let round = 0; round < rounds; round++) {
      for (let i = 0; i < lengths.length; i++) {
        let loopLength = lengths[i];
        let reversedSection = [];

        for (let at = position, x = 0; x < loopLength; x++) {
          at = (position + x) % result.length;
          reversedSection.unshift(result[at]);
        }

        for (let at = position, x = 0; x < loopLength; x++) {
          at = (position + x) % result.length;
          result[at] = reversedSection[x];
        }

        position = (position + loopLength + skip) % result.length;
        skip++;
      }
    }

    return result;
  }
function getDenseHash(sparseHash) {
    let result = [];

    for (let blockNr = 0; blockNr < 16; blockNr++) {
        let block = sparseHash.slice(blockNr * 16, (blockNr + 1) * 16);
        result[blockNr] = block.reduce((a,b) => a ^ b);
    }

    return result;
}

function getHexForArray(denseHash) {
    return denseHash
        .map(digit => ("0" + digit.toString(16)).substr(-2))
        .join("");
}
