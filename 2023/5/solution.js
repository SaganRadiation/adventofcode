import { readFileSync } from 'fs';

function pretty_tuple(x){
	return `(${x[0]},${x[1]})`;
}

function pretty_tuples(x){
	return x.map(y=>pretty_tuple(y));
}

function convert(number, charts){
	for (const chart of charts){
		if (number >= chart[1] && number <= chart[1]+chart[2]){
			return number + chart[0] - chart[1];
		}
	}
	return number;
}

function convert_range(range,charts){
	let remapped_set = [];
	let remaining_set = range;
	for (const chart of charts){
		let new_remaining_set = [];
		for (const r of remaining_set){
			const x = chart[0]-chart[1];
			const a = r[0]
			const b = r[1];
			const c = chart[1];
			const d = chart[1] + chart[2] - 1;
			if (a>d || b < c){
				// no overlap
				new_remaining_set.push([a,b]);
				continue;
			}
			if (a>=c && b <= d){
				remapped_set.push([a+x,b+x]);
				continue;
			}
			if (a>=c && b >d){
				remapped_set.push([a+x, d+x])
				new_remaining_set.push([d+1, b]);
				continue;
			}
			if (a<c && b<=d){
				new_remaining_set.push([a, c-1]);
				remapped_set.push([c+x, b+x]);
				continue;
			}
			if (a< c&& b > d){
				new_remaining_set.push([a, c-1]);
				remapped_set.push([c+x, d+x]);
				new_remaining_set.push([d+1, b]);
				continue;
			}
		}
		remaining_set = new_remaining_set;
	}
	let ret = remapped_set.concat(remaining_set);
	return ret;
}

function make_ranged_seeds(seed_data){
	let ret = [];
	for (let i=0;i+1<seed_data.length;i+=2){
		ret.push([seed_data[i],seed_data[i] + seed_data[i+1] -1]);
	}
	return ret;
}

function parse_data(data){
	let parsed = data.match(/seeds: ([^\n]+)\n(.*)/s)
	let seeds= parsed[1]
	let maps = parsed[2]
	seeds = seeds.match(/[\d]+/g).map(x=>parseInt(x));
	maps=maps.matchAll(/[\w\s]+ map:\n([\d\s]+)\n/g);
	let my_maps = []
	for (const map of maps){
		let rows = map[0].match(/[\d ]+\n/g)
		rows = rows.map(x=>(x.match(/\d+/g).map(y=>parseInt(y))));
		my_maps.push(rows);
	}
	return [seeds,my_maps];
}

function get_answer_one(data){
	let [seeds, my_maps] = parse_data(data);
	for (const charts of my_maps){
		seeds=seeds.map(x=>convert(x, charts));
	}
	return Math.min(...seeds);
	
}

function get_answer_two(data){
	const [seeds, my_maps] = parse_data(data);
	let ranged_seeds = make_ranged_seeds(seeds);
	//console.log('ranged seeds: '+ pretty_tuples(ranged_seeds));
	for (const charts of my_maps){
		ranged_seeds=convert_range(ranged_seeds, charts);
	}
	//console.log('final seeds: ' + pretty_tuples(ranged_seeds));
	return Math.min(...ranged_seeds.map(x=>x[0]));
}


const data = readFileSync('input.txt', 'utf-8');
console.log(get_answer_one(data));
console.log(get_answer_two(data));