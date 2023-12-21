import {readFileSync} from 'fs';

function is_numeric(x){
	return x.charCodeAt(0) >=48 & x.charCodeAt(0) <=57;
}

function get_number_coords(data){
	let ret = [];
	const h = data.length;
	const w = data[0].length;
	for (const i in data){
		for (const j in data[i]){
			if (!is_numeric(data[i][j])){
				continue;
			}
			if (j!=0 && is_numeric(data[i][j-1])){
				continue;
			}
			ret.push([Number(i),Number(j)]);
		}
	}
	return ret;
}

function is_good_point(i,j, data){
	const deltas = [-1,0,1];
	for (const x of deltas){
		for (const y of deltas){
			const new_i = i+x;
			const new_j = j+y;
			if (new_i <0 || new_i >= data.length || new_j<0 || new_j >= data[0].length){
				continue;
			}
			if (data[new_i][new_j] != '.' && !is_numeric(data[new_i][new_j])){
				return true;
			}
		}
	}
	return false;
}

function is_good_number(i,j, data){
	for (let iter=j;iter<data[i].length && is_numeric(data[i][iter]);iter++){
		if (is_good_point(i,iter,data)){
			return true;
		}
	}
	return false;
}

function get_number(i, j, data){
	let ret = '';
	for (let iter=j;iter<data[i].length && is_numeric(data[i][iter]);iter++){
		ret += data[i][iter];
	}
	return Number(ret);
}

class ObjectSet extends Set{
  add(elem){
    return super.add(typeof elem === 'object' ? JSON.stringify(elem) : elem);
  }
  has(elem){
    return super.has(typeof elem === 'object' ? JSON.stringify(elem) : elem);
  }
}

function get_answer_two(data){
	let ret = [];
	const h = data.length;
	const w = data[0].length;
	let sum = 0;
	for (const i in data){
		for (const j in data[i]){
			if (data[i][j] != '*'){
				continue;
			}
			//console.log('Potential gear at ' + i + ', ' + j);
			let adjacent_number_coords = new ObjectSet();
			const deltas = [-1,0,1];
			for (const x of deltas){
				for (const y of deltas){
					const new_i = Number(i)+x;
					const new_j = Number(j)+y;
					if (new_i <0 || new_i >= data.length || new_j<0 || new_j >= data[0].length){
						continue;
					}
					if (is_numeric(data[new_i][new_j])){
						//console.log('Adjacent number at ' + new_i + ', ' + new_j);
						let newnew_j = new_j;
						while(newnew_j>0 && is_numeric(data[new_i][newnew_j-1])){
							newnew_j -=1;
						}
						//console.log('Adjacent number starts at ' + new_i + ', ' + newnew_j);
						adjacent_number_coords.add([new_i, newnew_j]);
					}
				}
			}
			//console.log('gear count: ' + adjacent_number_coords.size);
			if (adjacent_number_coords.size != 2){
				continue;
			}
			let product = 1;
			for (const foo_raw of adjacent_number_coords){
				const foo = eval(foo_raw);
				const num = get_number(foo[0], foo[1], data);
				product *= num;
			}
			sum += product;
		}
	}
	return sum
}


function get_answer_one(data) {
console.log('Here is the data:\n' + data.join('\n'));
let coords = get_number_coords(data);
//console.log('Here are the coords: '+ coords.map(a=>{return '(' + a[0] + ',' + a[1] + ')'}));
coords = coords.filter(x => is_good_number(x[0], x[1], data));
//console.log('Here are the filtered coords: '+ coords.map(a=>{return '(' + a[0] + ',' + a[1] + ')'}));
const numbers = coords.map(x=>get_number(x[0],x[1],data));
//console.log('Here are the numbers: '+ numbers)
return numbers.reduce((a,b)=>{return a+b;},0);
}

const data = readFileSync('input.txt', 'utf-8').split('\n');
console.log(get_answer_one(data));
console.log(get_answer_two(data));
