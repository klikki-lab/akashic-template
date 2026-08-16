import { StringUtil } from "../util/stringUtil";

export interface SpaceFilledParameterObject extends g.LabelParameterObject {
    /** 桁数。1 未満の場合、エラーを投げる。 */
    digits: number;
}

export class SpaceFilledLabel extends g.Label {

    #spaces: string;

    constructor(param: SpaceFilledParameterObject) {
        if (param.digits < 1) throw new Error(`digits は 1 以上である必要があります。 digits:${param.digits}`);
        super(param);

        this.#spaces = StringUtil.repeat(" ", param.digits - 1);
        // this.#spaces = ' '.repeat(param.digits - 1);
    }

    setValue(value: number): void {
        const spacesFiiledValue = (this.#spaces + value).slice(-(this.#spaces.length + 1));
        this.text = `${spacesFiiledValue}`;
        this.invalidate();
    }
}