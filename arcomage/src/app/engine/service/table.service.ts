import { Injectable } from '@angular/core';
import { Card } from '../model/card';
import { Player } from '../model/player';
import { Game } from '../model/game';
import { CARD_IDX } from '../enum/card-idx.enum';
import { WaistService } from './waist.service';
import { DealCards, NextCardFromWaist } from '../util/waist-dealings';
import { SideEffectService } from './side-effect.service';
import { CardPlayingService } from './card-playing.service';

@Injectable()
export class TableService {

  constructor(
    private waistService: WaistService,
    private cardPlayingService: CardPlayingService) {
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
    const waist: Card[] = this.waistService.createWaist();
    const playerRed: Player = {
      bricks: {
        state: initialBricksState,
        growth: initialBricksGrowth
      },
      gems: {
        state: initialGemsState,
        growth: initialGemsGrowth
      },
      recruits: {
        state: initialRecruitsState,
        growth: initialRecruitsGrowth
      },
      castle: {
        tower: initialTowerHeight,
        wall: initialWallHeight
      },
      isMyTurn: false,
      haveCardToDiscard: 0,
      cards: []
    };
    const playerBlue: Player = { ...playerRed };
    playerRed.isMyTurn = true;
    const dealCards: DealCards = this.waistService.dealCards(waist);
    playerRed.cards = dealCards.playerRed;
    playerBlue.cards = dealCards.playerBlue;
    return {
      waist: dealCards.waist,
      discardedWaist: [],
      playerRed,
      playerBlue,
      towerHeightForWin
    };
  }

  playerPlayCard(cardIdx: CARD_IDX, game: Game): Game {
    return this.cardPlayingService.playCard(cardIdx, game.playerRed, game);
  }

  playerDiscardCard(cardIdx: CARD_IDX, game: Game): Game {
    return this.cardPlayingService.discardCard(cardIdx, game.playerRed, game);
  }

  playerCanPlayThisCard(cardIdx: CARD_IDX, game: Game): boolean {
    return this.cardPlayingService.canPlayThisCard(game.playerRed.cards[cardIdx], game.playerRed);
  }
}
