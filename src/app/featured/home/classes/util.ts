import { UserThrows } from "../models/user-throws.enum";

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function numberToString(int: number): string {
  let choice: string;
  switch (int) {
    case UserThrows.ROCK:
      choice = "rock";
      break;
    case UserThrows.PAPER:
      choice = "paper";
      break;
    case UserThrows.SCISSORS:
      choice = "scissors";
      break;
  }
  return choice;
}
