var map = document.body.textContent.split('\n').map(x => x.split(''));

var x = map[0].indexOf('|');
var y = 0;
var direction = 2;
var steps = 0;
var order = [];

function changeDir(x, y, direction) {
   var val = map[y][x]
   if (val >= 'A' && val <= 'Z') {
      order.push(val);
   }
   if (val == '+') {
      if (map[y-1][x] == '|' && direction != 2) {
         return 0;
      }
      if (map[y+1][x] == '|' && direction != 0) {
         return 2
      }
      if (map[y][x-1] == '-' && direction != 1) {
         return 3;
      }
      if (map[y][x+1] == '-' && direction != 3) {
         return 1;
      }
   }
   return direction
}

while(true) {
   steps++;
   switch (direction) {
      case 0:
         y--;
         break;
      case 1:
         x++;
         break;
      case 2:
         y++;
         break;
      case 3:
         x--;
         break;
   }
   direction = changeDir(x, y, direction)
   if (map[y][x] == ' ') {
      break;
   }
}

console.log(order.join(''), steps)
