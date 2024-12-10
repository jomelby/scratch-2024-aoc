import React from "react";
import { Form } from "./Day08";



function partOne(input: string): string {
    let disk: string[] = [];
    for (let id = 0; id * 2 < input.length; id++) {
        // console.log(input[id * 2 + 1]);
        // console.log(parseInt(input[id * 2 + 1]));
        let block = new Block(id, parseInt(input[id * 2]), parseInt(input[id * 2 + 1]));
        // console.log(block);
        disk.push(...block.toStringArray());
    }
    while (true) {
        let first_dot_index = disk.indexOf(".");
        let last_number = disk.filter((x) => x !== ".").pop()!;
        let last_number_index = disk.lastIndexOf(last_number);
        if (first_dot_index > last_number_index) {
            break
        }
        disk[first_dot_index] = last_number;
        disk[last_number_index] = ".";
    }
    // console.log(disk);

    let checksum: number = 0;
    for (let i = 0; i < disk.length; i++) {
        if (disk[i] == ".") {
            break
        }
        checksum += parseInt(disk[i]) * i;
    }
    return checksum.toString();
}


function partTwo(input: string): string {
    let blocks: Block[] = [];
    let disk: string[] = [];
    for (let id = 0; id * 2 < input.length; id++) {
        let block = new Block(id, parseInt(input[id * 2]), parseInt(input[id * 2 + 1]));
        blocks.push(block);
        disk.push(...block.toStringArray());
    }
    // console.log(blocks);
    for (let block of blocks.reverse()) {
        let first_block_id_index = disk.indexOf(block.id.toString());
        for (let i = 0; i < first_block_id_index; i++) {

            if (disk.slice(i, i + block.blocks).every((x) => x == ".")) {
                disk = disk.map((x) => x == block.id.toString() ? "." : x);
                disk = disk.slice(0, i).concat(Array(block.blocks).fill(block.id.toString()).concat(disk.slice(i + block.blocks)));
                break;
            }
        }
    }

    // console.log(disk);

    let checksum: number = 0;
    for (let i = 0; i < disk.length; i++) {
        if (disk[i] == ".") {
            continue
        }
        checksum += parseInt(disk[i]) * i;
    }
    console.log(checksum);
    return checksum.toString();
}

class Block {
    id: number;
    blocks: number;
    free_space: number;

    constructor(id: number, blocks: number, free_space: number) {
        this.id = id;
        this.blocks = blocks;
        this.free_space = Number.isNaN(free_space) ? 0 : free_space;
    }

    toStringArray(): string[] {
        const id_array = Array(this.blocks).fill(this.id.toString());
        const free_space_array = Array(this.free_space).fill(".");
        return id_array.concat(free_space_array);
    }
}



const Day09: React.FC = () => {
    const [content, setContent] = React.useState('');
    const [part1Answer, setPart1Answer] = React.useState('');
    const [part2Answer, setPart2Answer] = React.useState('');
    const handleButtonClick = () => {
        let answer = partOne(content);
        setPart1Answer(answer);
        let part2Answer = partTwo(content);
        setPart2Answer(part2Answer);
    };
    return (
        <div>
            <h1>Day 09 Page </h1>
            < p > This is the Day 09 page.</p>
            <Form name="Input" content={content} setContent={setContent} />
            <button onClick={handleButtonClick}>Submit</button>
            <p>Part 1 Answer: {part1Answer}</p>
            <p>Part 2 Answer: {part2Answer}</p>
        </div>
    );
};

export default Day09;