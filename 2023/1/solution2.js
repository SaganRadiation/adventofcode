import { readFileSync } from 'fs';

let numbers = [
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9'],
];


function get_first_number(x){
  for(let i = 0; i < x.length; i++){
  	let y= x.charCodeAt(i);
  	if (y>=48 & y<= 57){
  		return x.charAt(i);
  	}
    for (let [k,v] of numbers){
      if (x.substring(i).startsWith(k)){
        return v;
      }
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
    for (let [k,v] of numbers){
      if (x.substring(i).startsWith(k)){
        return v;
      }
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

