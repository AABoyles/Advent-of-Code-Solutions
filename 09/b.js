const input = document.body.textContent;

var currentChar = '';
var isGarbage = false;
var stackDepth = 1;
var sum = 0;
var garbageChars = 0;
for(var i = 0; i < input.length; i++){
  currentChar = input[i];
  if(isGarbage){
    if(currentChar == '!'){ i++; continue; }
    if(currentChar == '>'){ isGarbage = false; continue; }
    garbageChars++;
  } else {
    if(currentChar == '<') isGarbage = true;
    if(currentChar == '{') sum += stackDepth++;
    if(currentChar == '}') stackDepth--;
    if(stackDepth == 1) break;
  }
}
console.log(sum);
