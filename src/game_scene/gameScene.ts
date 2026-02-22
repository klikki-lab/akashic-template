import * as hover from "@akashic-extension/akashic-hover-plugin";
import { TextButton } from "../common/gui/textButton";
import { BaseScene } from "../common/scene/baseScene";
import { AudioController } from "../common/util/audioController";
import { CountdownTimer } from "../common/util/countdownTimer";
import { Random } from "../common/util/random";
import { GameMainParameterObject } from "./../parameterObject";

export class GameScene extends BaseScene<void> {

    private audioController: AudioController;
    private countdownTimer: CountdownTimer;
    private random: Random;

    private isFinish = false;

    constructor(param: GameMainParameterObject, isTouched: boolean, timeLimit: number) {
        super({
            game: g.game,
            assetIds: [

            ],
        });

        this.random = new Random(param.random || g.game.random);
        // g.game.operationPluginManager.register(hover.HoverPlugin, 5);
        g.game.operationPluginManager.register(hover.HoverPlugin, 25, { showTooltip: true });
        // g.game.operationPluginManager.register(hover.HoverPlugin, 5, { cursor: "help", showTooltip: true }); // HoverPlugin を 識別コード 5 で 登録
        g.game.operationPluginManager.start(25); // 識別コード 5 のプラグインを開始

        // g.game.operationPluginManager.stop(5)

        this.onLoad.add(() => this.loadHandler(isTouched, timeLimit));
    }

    private loadHandler = (isTouched: boolean, timeLimit: number): void => {
        this.countdownTimer = this.createCountdownTimer(timeLimit);
        this.audioController = this.createAudioController(0.175, 0.2, !isTouched);


        const font = new g.DynamicFont({
            game: g.game,
            fontFamily: "sans-serif",
            size: 24,
        });
        const button = new TextButton(this, "START!", font);
        button.x = (g.game.width - button.width) / 2;
        button.y = (g.game.height - button.height) / 2;
        // hover.Converter.asHoverable(button);
        const hoveredRect = hover.Converter.asHoverable(button);
        // hoveredRect.title= "Start Game";
        // hoveredRect.hoverable = true;
        hoveredRect.hovered.add(() => {
            console.log("hovered");
        });
        hoveredRect.unhovered.add(() => {
            console.log("unhovered");
        });
        this.append(button);

        const button1 = new TextButton(this, "START!", font);
        button1.x = (g.game.width - button.width) / 2;
        button1.y = (g.game.height - button.height) / 2 + button.height * 2;
        const hoveredRect1 = hover.Converter.asHoverable(button1);
        hoveredRect1.title = "Test";
        hoveredRect1.hoverable = true;
        hoveredRect1.hovered.add(() => {
            console.log("hovered");
        });
        hoveredRect1.unhovered.add(() => {
            console.log("unhovered");
        });

        this.append(button1);

        this.onUpdate.add(this.updateHandler);
    };

    private updateHandler = (): void | boolean => {
        // if (this.isFinish) return;
        this.processPointEvent();

    };

    private processPointEvent(): void {
        if (!this.pointEventQueue.isEmpty()) {
            const ev = this.pointEventQueue.pop();
            switch (ev?.type) {
                case "point-down":
                    console.log("down");
                    break;
                case "point-move":
                    console.log("move");
                    break;
                case "point-up":
                    console.log("up");
                    break;
                default:
                    console.log("unknown");
                    break;
            }
        }
    }

    private createCountdownTimer(timeLimit: number): CountdownTimer {
        const countdownTimer = new CountdownTimer(timeLimit);
        countdownTimer.onTick = remainingSec => {

        };

        countdownTimer.onFinish = () => {
            this.isFinish = true;
        };
        return countdownTimer;
    }

    private createAudioController(musicVolume: number, soundVolume: number, disable: boolean): AudioController {
        const audioController = new AudioController(musicVolume, soundVolume, disable);

        return audioController;
    }
}