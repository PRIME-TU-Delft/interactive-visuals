import { alea } from 'seedrandom';

type ColorString = `#${string}`;
type StringOrNumber = string | number;

export const backgroundColors : ReadonlyArray<ColorString> = [
	"#1A1A1A",
	"#CFC7C0",
	"#E0E0E0"
]

export const colors: Readonly<ColorString>[] = [
	'#CFC7C0',
	'#FFCE2E',
	'#7AB1E8',
	'#F87089',
	'#308167',
	'#E15F55'
];

export default function getPseudoRandomColor(params?: StringOrNumber[]): ColorString {
	let randomIndex = Math.round(Math.random() * colors.length);

	if (params && params.length) {
		const concatParams = params.map((a) => a.toString()).join('');
		const arng = alea(concatParams);

		randomIndex = Math.round(arng() * colors.length);
	}
	return colors[randomIndex];
}
