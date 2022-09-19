export default class Slider {
	defaultValue = 0;
	min = -1;
	max = 1;
	step = 0.1;
	value = 0;

	constructor(defaultValue: number, min: number = -1, max: number = 1, step: number = 0.1) {
		this.defaultValue = defaultValue;
		this.min = min;
		this.max = max;
		this.step = step;
		this.value = defaultValue;
	}

	static Default = new Slider(0);

	reset() {
		this.value = this.defaultValue;
	}
}

export type SliderArray =
	| readonly []
	| readonly [Slider]
	| readonly [Slider, Slider]
	| readonly [Slider, Slider, Slider];
