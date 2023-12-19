import {readFileSync} from 'fs';

const cube_count = new Map([['red', 12], ['green', 13], ['blue', 14]])

function is_subgame_possible(subgame){
	const balls = subgame.split(',').map(x=>x.trim());
	for (const ball of balls){
		const match_data = ball.match(/(\d+) (\w+)/)
		const num = Number(match_data[1]);
		const color = match_data[2]
		if (!cube_count.has(color)){
			return false;
		}
		if (cube_count.get(color) < num){
			return false;
		}
	}
	return true;
}

function is_possible(game){
	//console.log("TODO: Determine feasibility of: " + game);
	const subgames = game.split(';')
	for (const subgame of subgames){
		if (!is_subgame_possible(subgame)){
			//console.log('possible!');
			return false;
		}
	}
	//console.log('impossible!');
	return true;
}

function maybe_get_id(line){
	const match_data = line.match(/Game (\d+): (.+)/);
	//console.log('match data: ' + match_data);
	if (is_possible(match_data[2])){
		//console.log('possible! sum: ' + match_data[1]);
		return Number(match_data[1]);
	}
	return 0;
}

function first_answer(data){
	let sum = 0;
	for (const line of data){
		sum+=maybe_get_id(line)
	}
	return sum;
}

function second_answer(data){
	let total= 0;
	for (const line of data){
		const game = line.match(/Game \d+: (.+)/)[1];
		let red_count = 0;
		let blue_count = 0;
		let green_count = 0;
		for (const subgame of game.split(';')){
			const balls = subgame.split(',').map(x=>x.trim());
			for (const ball of balls){
				const match_data = ball.match(/(\d+) (\w+)/)
				const num = Number(match_data[1]);
				const color = match_data[2]
				//console.log("Num: " + num + ", Color: " + color);
				if (color == "red"){
					red_count = Math.max(red_count, num);
				} else if (color == "green"){
					green_count = Math.max(green_count, num);
				} else if (color == "blue"){
					blue_count = Math.max(blue_count, num);
				} else{
					console.log("Unrecognized color: " + color);
				}
				//console.log("Red: " + red_count + ", Green: " + green_count + ", Blue: " + blue_count);
			}		
		}
		total += (red_count * blue_count * green_count);
		//console.log("Red: " + red_count + ", Green: " + green_count + ", Blue: " + blue_count);
	    //console.log("Running total: " + total);
	}
	return total;
}
const data = readFileSync('input.txt', 'utf-8').split('\n');
console.log(first_answer(data));
console.log(second_answer(data));