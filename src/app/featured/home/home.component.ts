import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2
} from "@angular/core";

import { getRandomInt, numberToString } from "./classes/util";
import { UserThrows } from "./models/user-throws.enum";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  private result: number = null;
  message: string = "";

  win: number = 0;
  lose: number = 0;
  winRate: string = "0";

  player: number = null;
  playerThrew: string = "";
  AI: number = null;
  AIThrew: string = "";

  @ViewChild("middle", { read: ElementRef }) middle: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  updateResult(userThrows: number): void {
    this.player = userThrows;
    this.AI = getRandomInt(3);
    this.result = this.player - this.AI;
    this.determineResult();
    this.playerThrew = numberToString(this.player);
    this.AIThrew = numberToString(this.AI);
  }

  determineResult(): void {
    if (this.result === -2 || this.result === 1) {
      this.message = "You won, Congratulations!";
      ++this.win;
      this.setColor("green");
    } else if (this.result === 0) {
      this.message = "Draw, try again!";
      this.setColor("#0099e6");
    } else {
      this.message = "You lost, try again!";
      ++this.lose;
      this.setColor("red");
    }

    this.pauseAnimation();
    this.getWinRate();
    this.showMessage();
    this.calibrateAnimation();
  }

  getWinRate(): void {
    if (0 < this.win) {
      this.winRate = ((this.win / (this.win + this.lose)) * 100).toFixed(2);
    }
  }

  reset(): void {
    this.win = 0;
    this.lose = 0;
    this.winRate = "0";
    this.playerThrew = "";
    this.AIThrew = "";
    this.message = "";
    this.showMessage();
    this.removeAnimation();
    this.runAnimation();
  }

  tryAgain(): void {
    this.playerThrew = "";
    this.AIThrew = "";
    this.message = "";
    this.showMessage();
    this.removeAnimation();
    this.runAnimation();
  }

  pauseAnimation(): void {
    this.renderer.addClass(this.middle.nativeElement, "animation-pause");
  }

  runAnimation(): void {
    this.renderer.removeClass(this.middle.nativeElement, "animation-pause");
  }

  calibrateAnimation(): void {
    switch (this.AI) {
      case UserThrows.ROCK:
        this.renderer.addClass(this.middle.nativeElement, "animation-rock");
        break;
      case UserThrows.PAPER:
        this.renderer.addClass(this.middle.nativeElement, "animation-paper");
        break;
      case UserThrows.SCISSORS:
        this.renderer.addClass(this.middle.nativeElement, "animation-scissors");
        break;
    }
  }

  removeAnimation(): void {
    switch (this.AI) {
      case UserThrows.ROCK:
        this.renderer.removeClass(this.middle.nativeElement, "animation-rock");
        break;
      case UserThrows.PAPER:
        this.renderer.removeClass(this.middle.nativeElement, "animation-paper");
        break;
      case UserThrows.SCISSORS:
        this.renderer.removeClass(
          this.middle.nativeElement,
          "animation-scissors"
        );
        break;
    }
  }

  setColor(color: string): void {
    this.renderer.setStyle(this.middle.nativeElement, "color", color);
  }

  showMessage(): void {
    this.renderer.setProperty(
      this.middle.nativeElement,
      "textContent",
      this.message
    );
  }
}
