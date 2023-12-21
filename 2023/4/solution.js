import { readFileSync } from 'fs';

function get_answer_one(data){
	return data.map(x=>{
		//console.log('parsing: ' + x);
		const m = x.match(/Card\s+\d+: (.+) \| (.+)/)
		const want = m[1].match(/\d+/g)
		const have = m[2].match(/\d+/g)
		const intersect = have.filter(x=>want.includes(x));
		return intersect.length == 0? 0 : 2 ** (intersect.length - 1);
	}).reduce((x,y)=>x+y,0);
}

const data = readFileSync('input.txt', 'utf-8').split('\n');
console.log(get_answer_one(data));