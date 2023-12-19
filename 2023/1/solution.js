import { readFileSync } from 'fs';

function get_first_number(x){
  for(let i = 0; i < x.length; i++){
  	let y= x.charCodeAt(i);
  	if (y>=48 & y<= 57){
  		return x.charAt(i);
  	}
  }
  return "0";
}

function get_last_number(x){
  for(let i = x.length-1; i >=0; i--){
    let y= x.charCodeAt(i);
    if (y>=48 & y<= 57){
      return x.charAt(i);
    }
  }
  return "0";
}

function get_sum(x){
  return Number(get_first_number(x) + get_last_number(x));
}

let data = readFileSync('input.txt', 'utf-8').split('\n');
let sum = 0
for (const line of data){
  sum += get_sum(line);
}
console.log(sum);
