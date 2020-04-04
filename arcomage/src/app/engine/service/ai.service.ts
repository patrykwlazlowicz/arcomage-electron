import { Injectable } from '@angular/core';
import { Game } from '../model/game';

@Injectable()
export class AIService {

  constructor() { }

  play(game: Game): Game {
    return game;
  }
}
