/**
 * エンティティ2Dクラス。このエンティティの上下左右の位置を取得できるメソッドを持つ。
 */
export class Entity2D extends g.E {

    top = (): number => this.y - this.height * this.anchorY;

    right = (): number => this.x + this.width * (1 - this.anchorX);

    bottom = (): number => this.y + this.height * (1 - this.anchorY);

    left = (): number => this.x - this.height * this.anchorX;
}