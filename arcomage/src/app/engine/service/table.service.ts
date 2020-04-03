import { Injectable } from '@angular/core';
import CARDS from '../../../assets/cards.json';
import { Card } from '../model/card';
import { Player } from '../model/player';
import * as _ from 'lodash';
import { Game } from '../model/game';

@Injectable()
export class TableService {

  private static BASE_WAIST: Card[] = [];

  constructor() {
    TableService.BASE_WAIST = _.map(CARDS, (card) => <Card>card);
  }

  createGame(initialTowerHeight: number,
    initialWallHeight: number,
    initialBricksState: number,
    initialBricksGrowth: number,
    initialGemsState: number,
    initialGemsGrowth: number,
    initialRecruitsState: number,
    initialRecruitsGrowth: number,
    towerHeightForWin: number): Game {
    const waist = _.shuffle(TableService.BASE_WAIST);
    const playerRed = new Player(initialBricksState,
      initialBricksGrowth,
      initialGemsState,
      initialGemsGrowth,
      initialRecruitsState,
      initialRecruitsGrowth,
      initialTowerHeight,
      initialWallHeight);
    const playerBlue = new Player(initialBricksState,
      initialBricksGrowth,
      initialGemsState,
      initialGemsGrowth,
      initialRecruitsState,
      initialRecruitsGrowth,
      initialTowerHeight,
      initialWallHeight);
    return new Game(waist, playerRed, playerBlue, towerHeightForWin);
  }
}
