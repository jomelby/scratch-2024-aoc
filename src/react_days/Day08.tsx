import React, { useEffect, useId } from 'react';

interface FormProps {
    name: string;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const Form: React.FC<FormProps> = ({ name, content, setContent }) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };
    const postTextAreaId = useId();
    return (
        <>
            <label htmlFor={postTextAreaId}>
                {name}
            </label>
            <textarea
                id={postTextAreaId}
                name="postContent"
                rows={4}
                cols={40}
                value={content}
                onChange={handleChange}
            />
        </>
    );
}

function findAntennas(input: string): Map<string, Array<[number, number]>> {
    let antennas_map = new Map<string, Array<[number, number]>>();
    const lines = input.split("\n");
    for (let y = 0; y < lines.length; y++) {
        console.log(lines[y]);
        for (let x = 0; x < lines[y].length; x++) {
            const char = lines[y][x];
            if (char === ".") {
                continue;
            }
            let antenna: [number, number][];
            antenna = antennas_map.get(char) || [];
            antenna.push([x, y]);
            antennas_map.set(char, antenna);
        }
    }
    return antennas_map;
}

export function calculateAntinodes(antenna1: [number, number], antenna2: [number, number], max_x: number, max_y: number): [number, number][] {
    // calculate the distance between the two nodes
    const dx = antenna1[0] - antenna2[0];
    const dy = antenna1[1] - antenna2[1];
    const first_antinode: [number, number] = [antenna1[0] + dx, antenna1[1] + dy];
    const second_antinode: [number, number] = [antenna2[0] - dx, antenna2[1] - dy];
    let first_antinode_valid = first_antinode[0] >= 0 && first_antinode[0] < max_x && first_antinode[1] >= 0 && first_antinode[1] < max_y;
    let second_antinode_valid = second_antinode[0] >= 0 && second_antinode[0] < max_x && second_antinode[1] >= 0 && second_antinode[1] < max_y;
    if (first_antinode_valid && second_antinode_valid) {
        return [first_antinode, second_antinode];
    } else if (first_antinode_valid) {
        return [first_antinode];
    } else if (second_antinode_valid) {
        return [second_antinode];
    } else {
        return [];
    }
}
export function calculateAntinodesPart2(antenna1: [number, number], antenna2: [number, number], max_x: number, max_y: number): [number, number][] {
    // calculate the distance between the two nodes
    const dx = antenna1[0] - antenna2[0];
    const dy = antenna1[1] - antenna2[1];
    console.log(`dx: ${dx}, dy: ${dy} antenna1: ${antenna1} antenna2: ${antenna2}`);
    let antinodes: [number, number][] = [];
    let new_antinode: [number, number] = [antenna2[0] + dx, antenna2[1] + dy];
    while (true) {
        if (new_antinode[0] >= max_x || new_antinode[0] < 0 || new_antinode[1] >= max_y || new_antinode[1] < 0) {
            break;
        }
        console.log(antinodes.push(new_antinode));
        new_antinode = [new_antinode[0] + dx, new_antinode[1] + dy];
    }
    new_antinode = [antenna1[0] - dx, antenna1[1] - dy];
    while (true) {
        if (new_antinode[0] >= max_x || new_antinode[0] < 0 || new_antinode[1] >= max_y || new_antinode[1] < 0) {
            break;
        }
        antinodes.push(new_antinode);
        new_antinode = [new_antinode[0] - dx, new_antinode[1] - dy];

    }
    return antinodes;
}



function partOne(input: string): string {
    const antennas_map = findAntennas(input);
    let antinodes = new Set<string>();
    const split_input = input.split("\n");
    const max_x = split_input[0].length;
    const max_y = split_input.length;
    for (let [key, value] of antennas_map) {
        if (value.length < 2) {
            continue;
        }
        for (let i = 0; i < value.length; i++) {
            for (let j = i + 1; j < value.length; j++) {
                calculateAntinodes(value[i], value[j], max_x, max_y).forEach((antinode: [number, number]) => antinodes.add(antinode.toString()));
            }
        }
    }
    return antinodes.size.toString();
}


function partTwo(input: string): string {
    const antennas_map = findAntennas(input);
    let antinodes = new Set<string>();
    const split_input = input.split("\n");
    const max_x = split_input[0].length;
    const max_y = split_input.length;
    for (let [key, value] of antennas_map) {
        if (value.length < 2) {
            continue;
        }
        for (let i = 0; i < value.length; i++) {
            for (let j = i + 1; j < value.length; j++) {
                calculateAntinodesPart2(value[i], value[j], max_x, max_y).forEach((antinode: [number, number]) => antinodes.add(antinode.toString()));
            }
        }
    }
    return antinodes.size.toString();
}





const Day08: React.FC = () => {
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
            <h1>Day 08 Page </h1>
            < p > This is the Day 08 page.</p>
            <Form name="Part 1 Input" content={content} setContent={setContent} />
            <button onClick={handleButtonClick}>Submit</button>
            <p>Part 1 Answer: {part1Answer}</p>
            <p>Part 2 Answer: {part2Answer}</p>
        </div>
    );
};

export default Day08;