/**
 * エンティティ2Dクラス。このエンティティの上下左右の位置を取得できるメソッドを持つ。
 */
export class Entity2D extends g.E {

    top(): number { return this.y - this.height * this.anchorY; }

    right(): number { return this.x + this.width * (1 - this.anchorX); }

    bottom(): number { return this.y + this.height * (1 - this.anchorY); }

    left(): number { return this.x - this.height * this.anchorX; }
}