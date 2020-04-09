import { Injectable } from '@angular/core';
import { PlayerDTO } from '../dto/player-dto';
import { GameDTO } from '../dto/game-dto';
import { CARD_IDX } from '../enum/card-idx.enum';
import _ from 'lodash';
import { Waist, DealCards } from '../model/waist';
import { Game } from '../model/game';

@Injectable()
export class TableService {

  createGame(initialTowerHeight: number,
    initialWallHeight: number,
    initialRsourcesState: number,
    initialGrowthGrowth: number,
    towerHeightForWin: number): GameDTO {
    const playerRed: PlayerDTO = {
      bricks: {
        state: initialRsourcesState,
        growth: initialGrowthGrowth
      },
      gems: {
        state: initialRsourcesState,
        growth: initialGrowthGrowth
      },
      recruits: {
        state: initialRsourcesState,
        growth: initialGrowthGrowth
      },
      castle: {
        tower: initialTowerHeight,
        wall: initialWallHeight
      },
      isMyTurn: false,
      haveCardToDiscard: 0,
      cards: []
    };
    const playerBlue: PlayerDTO = _.cloneDeep(playerRed);
    playerRed.isMyTurn = true;
    playerRed.bricks.state += playerRed.bricks.growth;
    playerRed.gems.state += playerRed.gems.growth;
    playerRed.recruits.state += playerRed.recruits.growth;
    const waist: Waist = new Waist();
    const dealCards: DealCards = waist.dealCards();
    playerRed.cards = dealCards.playerRed;
    playerBlue.cards = dealCards.playerBlue;
    const game: Game = new Game(waist, playerRed, playerBlue, towerHeightForWin);
    return game;
  }

  playerPlayCard(cardIdx: CARD_IDX, gameDTO: GameDTO): GameDTO {
    const game: Game = <Game> gameDTO;
    game.playCard(cardIdx, game.playerRed, game.playerBlue);
    return _.cloneDeep(game);
  }

  playerDiscardCard(cardIdx: CARD_IDX, gameDTO: GameDTO): GameDTO {
    const game: Game = <Game> gameDTO;
    game.discardCard(cardIdx, game.playerRed, game.playerBlue);
    return _.cloneDeep(game);
  }

  playerCanPlayThisCard(cardIdx: CARD_IDX, gameDTO: GameDTO): boolean {
    const game: Game = <Game> gameDTO;
    return game.canPlayThisCard(game.playerRed.cards[cardIdx], game.playerRed);
  }
}
