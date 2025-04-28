import { Affix } from "./afix";

export class TimeLabel extends g.Label {

    #prefix: string;
    #suffix: string;
    #spaces: string;

    constructor(param: g.LabelParameterObject, digits: number, private affix: Affix) {
        super(param);

        this.#prefix = this.affix.prefix ?? "";
        this.#suffix = this.affix.suffix ?? "";
        this.#spaces = ' '.repeat(digits - 1);
    }

    setTime(sec: number): void {
        const SpacesFiiledTime = (this.#spaces + sec).slice(-(this.#spaces.length + 1));
        this.text = `${this.#prefix}${SpacesFiiledTime}${this.#suffix}`;
        this.invalidate();
    }
}