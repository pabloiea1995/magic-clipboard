/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { v4 } from 'uuid';

export interface RegisterI {
	value: string;
	timestamp: Date;
	uid: string;
}
let memory: RegisterI[] = [];
const maxLenght = 20;

/**
 * Adds a new register to memory
 * @param element 
 */
function addToMemory(element: string): void {

	for(let register in memory){

		if(memory[register].value === element){
			return
		}


	}
	let register = {
		value: element,
		timestamp: new Date(),
		uid: v4()
	};


	if (memory.length >= maxLenght) {
		memory.push(register);
		memory.shift();
	} else {
		memory.push(register);
	}
	while (memory.length > maxLenght) {
		memory.shift();
	}
}

function removeRegister(register_uid:string): void {
	console.log(register_uid)
	if (register_uid && register_uid !== "") {
		let filtered = memory.filter((register) => register.uid !== register_uid);
		console.log(filtered)
		memory = filtered
	}
}

export default {
	maxLenght: 10,

	addToMemory,
    removeRegister,
	readMemory: () => memory
};
