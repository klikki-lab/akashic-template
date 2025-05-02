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
        this.onLoad.add(() => this.loadHandler(isTouched, timeLimit));
    }

    private loadHandler = (isTouched: boolean, timeLimit: number): void => {
        this.countdownTimer = this.createCountdownTimer(timeLimit);
        this.audioController = this.createAudioController(0.175, 0.2, !isTouched);

        this.onUpdate.add(this.updateHandler);
    };

    private updateHandler = (): void | boolean => {
        // if (this.isFinish) return;
        this.processPointEvent();

    };

    private processPointEvent(): void {
        if (!this.pointEventQueue.isEmpty()) {
            const ev = this.pointEventQueue.pop();
            switch (ev.type) {
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