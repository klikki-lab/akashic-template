import { FilledRect2D } from "../entity/filledRect2D";
import { Button } from "./button";

export class TextButton extends Button {

    private label: g.Label;
    private boader: FilledRect2D;
    private backgroung: FilledRect2D;
    private boaderColor: string = "black";
    private backgroundColor: string = "white";
    private pressedColor: string = "lightgray";

    constructor(scene: g.Scene, label: g.Label);
    constructor(scene: g.Scene, text: string, font: g.Font);

    constructor(scene: g.Scene, textOrLabel: string | g.Label, font?: g.Font) {
        super({ scene: scene, });

        this.label = typeof textOrLabel === "string" ? this.createlabel(textOrLabel, font) : textOrLabel;

        this.width = this.label.width + this.label.fontSize;
        this.height = this.label.height * 1.5;

        this.label.x = (this.width - this.label.width) / 2;
        this.label.y = (this.height - this.label.height) / 2;

        this.boader = new FilledRect2D({
            scene: scene,
            parent: this,
            width: this.width,
            height: this.height,
            cssColor: this.boaderColor,
        });

        this.backgroung = new FilledRect2D({
            scene: scene,
            parent: this,
            width: this.width - 2,
            height: this.height - 2,
            x: 1,
            y: 1,
            cssColor: this.backgroundColor,
        });

        this.append(this.label);
    }

    setText(text: string): void {
        this.label.text = text;
        this.label.x = (this.width - this.label.width) / 2;
        this.label.y = (this.height - this.label.height) / 2;
        this.label.invalidate();
    }

    setBackgorundColor(cssColor: string): void {
        this.backgroundColor = cssColor;
        this.backgroung.cssColor = cssColor;
        this.backgroung.modified();
    }

    setBoaderColor(cssColor: string): void {
        this.boaderColor = cssColor;
        this.boader.cssColor = cssColor;
        this.boader.modified();
    }

    setBoaderStrokeWeight(strokeWeight: number): void {
        if (strokeWeight <= 0) {
            if (this.boader.visible()) this.boader.hide();
        } else {
            if (!this.boader.visible()) this.boader.show();
        }

        this.backgroung.width = this.width - strokeWeight * 2;
        this.backgroung.height = this.height - strokeWeight * 2;
        this.backgroung.x = strokeWeight;
        this.backgroung.y = strokeWeight;
        this.backgroung.modified();
    }

    setPrressedColor(cssColor: string): void {
        this.pressedColor = cssColor;
    }

    protected override switchPressedState(isPressed: boolean): void {
        super.switchPressedState(isPressed);

        this.backgroung.cssColor = isPressed ? this.pressedColor : this.backgroundColor;
        this.backgroung.modified();

        if (this.boaderColor === this.backgroundColor) {
            this.boader.cssColor = isPressed ? this.pressedColor : this.boaderColor;
            this.boader.modified();
        }
    }

    private createlabel(text: string, font: g.Font): g.Label {
        return new g.Label({
            scene: this.scene,
            font: font,
            text: text,
        });
    }
}