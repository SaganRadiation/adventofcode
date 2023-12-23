import { readFileSync } from 'fs';

function parse_data1(data){
	let [time, distance] = data.split('\n')
	time = time.split(':')[1].match(/\d+/g).map(x=>parseInt(x));
	distance = distance.split(':')[1].match(/\d+/g).map(x=>parseInt(x));
	let ret = []
	for (let i = 0; i < time.length; i++){
		ret.push({'time': time[i], 'record': distance[i]});
	}
	return ret
}

function parse_data2(data){
	let [time, distance] = data.split('\n')
	time = parseInt(time.split(':')[1].match(/\d+/g).join(''));
	distance = parseInt(distance.split(':')[1].match(/\d+/g).join(''));
	return [{'time': time, 'record': distance}];
}

function distance_gone(hold, total){
	return (hold) * (total - hold);
}

function get_answer(data){
	return data.map(race=>{
		let beats = 0;
		for (let i = 0; i<= race.time; i++){
			if (distance_gone(i,race.time) > race.record){
				beats++;
			}
		}
		return beats;
	}).reduce((a,b)=>a*b, 1);
}

let data = readFileSync('input.txt', 'utf-8');
const data1 = parse_data1(data);
console.log(get_answer(data1));
const data2 = parse_data2(data);
console.log(get_answer(data2));