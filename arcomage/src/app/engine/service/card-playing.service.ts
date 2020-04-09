import { Injectable } from '@angular/core';
import { CARD_IDX } from '../enum/card-idx.enum';
import { Player } from '../model/player';
import { Game } from '../model/game';
import { Card } from '../model/card';
import { NextCardFromWaist } from '../util/waist-dealings';
import { WaistService } from './waist.service';
import { SideEffectService } from './side-effect.service';
import * as _ from 'lodash';

interface GameClone {
  game: Game;
  leader: Player;
  opponent: Player;
  playedCard: Card;
}

@Injectable()
export class CardPlayingService {

  constructor(
    private waistService: WaistService,
    private sideEffectService: SideEffectService) {
  }

  playCard(cardIdx: CARD_IDX, leader: Player, game: Game): Game {
    // sprawdz game.state
    let gameClone: GameClone = this.createGameClone(cardIdx, leader, game);
    if (gameClone.leader.isMyTurn) {
      if (!gameClone.leader.haveCardToDiscard && this.canPlayThisCard(gameClone.playedCard, gameClone.leader)) {
        gameClone = this.subtractPrice(cardIdx, gameClone.leader, gameClone.game);
        gameClone = this.discardPlayedCard(cardIdx, gameClone.leader, gameClone.game);
        gameClone = this.givePlayerNextCard(cardIdx, gameClone.leader, gameClone.game);
        for (let sideEffect of gameClone.playedCard.sideEffects) {
          this.sideEffectService.executeEffect(sideEffect, gameClone.leader, gameClone.opponent);
        }
        gameClone = this.swapTurnAfterPlayCard(cardIdx, gameClone.leader, gameClone.game);
        // sprawdzić wygraną
      }
      return gameClone.game;
    } else {
      throw Error("Engine failure");
    }
  }

  discardCard(cardIdx: CARD_IDX, leader: Player, game: Game): Game {
    // sprawdz game.state
    let gameClone: GameClone = this.createGameClone(cardIdx, leader, game);
    if (gameClone.leader.isMyTurn) {
      gameClone = this.discardPlayedCard(cardIdx, gameClone.leader, gameClone.game);
      gameClone = this.givePlayerNextCard(cardIdx, gameClone.leader, gameClone.game);
      gameClone = this.swapTurnAfterDiscardCard(cardIdx, gameClone.leader, gameClone.game);
      return gameClone.game;
    } else {
      throw Error("Engine failure");
    }
  }

  canPlayThisCard(card: Card, player: Player): boolean {
    return player.bricks.state >= card.price.bricks &&
      player.gems.state >= card.price.gems &&
      player.recruits.state >= card.price.recruits;
  }

  mockPlayCard(cardIdx: CARD_IDX, leader: Player, game: Game): Game {
    let gameClone: GameClone = this.createGameClone(cardIdx, leader, game);
    gameClone = this.subtractPrice(cardIdx, gameClone.leader, gameClone.game);
    for (let sideEffect of gameClone.playedCard.sideEffects) {
      this.sideEffectService.executeEffect(sideEffect, gameClone.leader, gameClone.opponent);
    }
    return gameClone.game;
  }

  // TODO create aspect decorator for cloning
  private createGameClone(cardIdx: CARD_IDX, leader: Player, game: Game): GameClone {
    const gameClone: Game = _.cloneDeep(game);
    const newLeader: Player = (leader === game.playerRed ? gameClone.playerRed : gameClone.playerBlue);
    return {
      game: gameClone,
      leader: newLeader,
      opponent: leader === game.playerRed ? gameClone.playerBlue : gameClone.playerRed,
      playedCard: newLeader.cards[cardIdx]
    }
  }

  private subtractPrice(cardIdx: CARD_IDX, leader: Player, game: Game): GameClone {
    const gameClone: GameClone = this.createGameClone(cardIdx, leader, game);
    gameClone.leader.bricks.state -= gameClone.playedCard.price.bricks;
    gameClone.leader.gems.state -= gameClone.playedCard.price.gems;
    gameClone.leader.recruits.state -= gameClone.playedCard.price.recruits;
    return gameClone;
  }

  private discardPlayedCard(cardIdx: CARD_IDX, leader: Player, game: Game): GameClone {
    const gameClone: GameClone = this.createGameClone(cardIdx, leader, game);
    gameClone.game.discardedWaist.push(gameClone.playedCard);
    return gameClone;
  }

  private givePlayerNextCard(cardIdx: CARD_IDX, leader: Player, game: Game): GameClone {
    const gameClone: GameClone = this.createGameClone(cardIdx, leader, game);
    const nextCardFromWaist: NextCardFromWaist = this.waistService.nextCardFromWaist(gameClone.game.waist, gameClone.game.discardedWaist);
    gameClone.leader.cards[cardIdx] = nextCardFromWaist.card;
    gameClone.game.waist = nextCardFromWaist.waist;
    gameClone.game.discardedWaist = nextCardFromWaist.discardedWaist;
    return gameClone;
  }

  private swapTurnAfterPlayCard(cardIdx: CARD_IDX, leader: Player, game: Game): GameClone {
    if (!leader.cards[cardIdx].playAgain && !leader.haveCardToDiscard) {
      return this.swapTurn(cardIdx, leader, game);
    }
  }

  private swapTurnAfterDiscardCard(cardIdx: CARD_IDX, leader: Player, game: Game): GameClone {
    const gameClone: GameClone = this.createGameClone(cardIdx, leader, game);
    if (gameClone.leader.haveCardToDiscard) {
      --gameClone.leader.haveCardToDiscard;
      return gameClone;
    } else {
      return this.swapTurn(cardIdx, gameClone.leader, gameClone.game);
    }
  }

  private swapTurn(cardIdx: CARD_IDX, leader: Player, game: Game): GameClone {
    const gameClone: GameClone = this.createGameClone(cardIdx, leader, game);
    gameClone.leader.isMyTurn = false;
    gameClone.opponent.isMyTurn = true;
    return this.increaseResources(cardIdx, gameClone.leader, gameClone.game);
  }

  private increaseResources(cardIdx: CARD_IDX, leader: Player, game: Game): GameClone {
    const gameClone: GameClone = this.createGameClone(cardIdx, leader, game);
    gameClone.opponent.bricks.state += gameClone.opponent.bricks.growth;
    gameClone.opponent.gems.state += gameClone.opponent.gems.growth;
    gameClone.opponent.recruits.state += gameClone.opponent.recruits.growth;
    return gameClone;
  }
}
