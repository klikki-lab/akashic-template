import { Entity2D, Entity2DParameterObject } from "../entity/entity2D";
import { SpaceFilledLabel } from "./spaceFilledLabel";

export interface Affix {
    /** 接頭辞を指定する。 */
    prefix?: g.Label;
    /** 接尾辞を指定する。  */
    suffix?: g.Label;
}

export interface ValueThreshold {
    /** 表示上の最小値。指定がなければ `0`。`max` 以上であれば例外を投げる。 */
    min?: number;
    /** 表示上の最大値(カンスト値)。指定がなければ `Number.MAX_VALUE`。 `0` または `min` 以下であれば例外を投げる。 */
    max?: number;
}

export interface LavelViewParameterObject extends Entity2DParameterObject, Affix, ValueThreshold {
    /** 値 */
    value: number;
    /** 値ラベル */
    valueLabel: SpaceFilledLabel;
}

export class LabelView extends Entity2D {

    #min: number;
    get min(): number { return this.#min; }

    #max: number;
    get max(): number { return this.#max; }

    #valueLabel: SpaceFilledLabel;

    /**
     * @param param `LavelViewParameterObject` 
     */
    constructor(param: LavelViewParameterObject) {
        const min = param.min ?? 0;
        const max = param.max ?? Number.MAX_VALUE;
        if (min >= max) throw new Error(`max は min 以上である必要があります。 min:${min}, max:${max}`);

        super(param);
        this.#min = min;
        this.#max = max;

        if (param.prefix !== undefined) {
            this.append(param.prefix);
        }
        const prefixWidth = param.prefix?.width ?? 0;

        this.#valueLabel = param.valueLabel;
        this.#valueLabel.x = prefixWidth;
        this.append(this.#valueLabel);

        if (param.suffix !== undefined) {
            param.suffix.x = this.#valueLabel.x + this.#valueLabel.width;
            this.append(param.suffix);
        }
    }

    setValue(value: number): void {
        const clamped = g.Util.clamp(value, this.#min, this.#max);
        this.#valueLabel.setValue(clamped);
    }

    override getWidth(): number {
        const rect = this.calculateBoundingRect();
        return rect ? rect.right - rect.left : this.#valueLabel.width;
    }

    override getHeight(): number {
        const rect = this.calculateBoundingRect();
        return rect ? rect.bottom - rect.top : this.#valueLabel.height;
    }
}