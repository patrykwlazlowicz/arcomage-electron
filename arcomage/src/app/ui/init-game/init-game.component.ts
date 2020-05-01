import { Component, OnInit } from '@angular/core';
import { MessagesMap } from '../../shared/util/messages-map';

@Component({
  selector: 'app-init-game',
  templateUrl: './init-game.component.html',
  styleUrls: ['./init-game.component.css']
})
export class InitGameComponent implements OnInit {

  private static readonly RESOURCE_STATE_INIT: number = 15;
  private static readonly RESOURCE_GROWTH_INIT: number = 1;
  private static readonly TOWER_INIT: number = 25;
  private static readonly WALL_INIT: number = 10;
  private static readonly TOWER_TO_WIN_INIT: number = 50;
  private static readonly TOWER_TO_WIN_MIN_DIFFERENCE: number = 5;

  MESSAGES_MAP: typeof MessagesMap = MessagesMap;
  RESOURCE_STATE_MIN: number = 10;
  RESOURCE_STATE_MAX: number = 50;
  RESOURCE_GROWTH_MIN: number = 1;
  RESOURCE_GROWTH_MAX: number = 10;
  TOWER_MIN: number = 10;
  TOWER_MAX: number = 100;
  WALL_MIN: number = 10;
  WALL_MAX: number = 100;
  TOWER_TO_WIN_MIN: number = 15;
  TOWER_TO_WIN_MAX: number = 200;
  BACK_PATH: string = '/menu';
  START_PATH_PREFFIX: string = '/game/play/';

  resourceStateValue: number = InitGameComponent.RESOURCE_STATE_INIT;
  resourceGrowthValue: number = InitGameComponent.RESOURCE_GROWTH_INIT;
  towerValue: number = InitGameComponent.TOWER_INIT;
  wallValue: number = InitGameComponent.WALL_INIT;
  towerToWinValue: number = InitGameComponent.TOWER_TO_WIN_INIT;

  constructor() { }

  ngOnInit(): void {
  }

  changeResourceState(event: string): void {
    this.resourceStateValue = Number(event);
  }

  changeResourceGrowth(event: string): void {
    this.resourceGrowthValue = Number(event);
  }

  changeTower(event: string): void {
    this.towerValue = Number(event);
    if (this.towerToWinValue - this.towerValue < InitGameComponent.TOWER_TO_WIN_MIN_DIFFERENCE) {
      this.towerToWinValue = this.towerValue + InitGameComponent.TOWER_TO_WIN_MIN_DIFFERENCE;
    }
  }

  changeWall(event: string): void {
    this.wallValue = Number(event);
  }

  changeTowerToWin(event: string): void {
    this.towerToWinValue = Number(event);
    if (this.towerToWinValue - this.towerValue < InitGameComponent.TOWER_TO_WIN_MIN_DIFFERENCE) {
      this.towerValue = this.towerToWinValue - InitGameComponent.TOWER_TO_WIN_MIN_DIFFERENCE;
    }
  }

}
