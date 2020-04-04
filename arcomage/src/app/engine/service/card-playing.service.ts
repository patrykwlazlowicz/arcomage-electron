import { Injectable } from '@angular/core';
import { CARD_IDX } from '../enum/card-idx.enum';
import { Player } from '../model/player';
import { Game } from '../model/game';
import { Card } from '../model/card';
import { NextCardFromWaist } from '../util/waist-dealings';
import { WaistService } from './waist.service';
import { SideEffectService } from './side-effect.service';

@Injectable()
export class CardPlayingService {

  constructor(
    private waistService: WaistService,
    private sideEffectService: SideEffectService) {

  }

  playCard(cardIdx: CARD_IDX, leader: Player, opponent: Player, game: Game): Game {
    // sprawdz game.state
    if (leader.isMyTurn) {
      const playedCard: Card = leader.cards[cardIdx];
      if (!leader.haveCardToDiscard && this.canPlayThisCard(leader, playedCard)) {
        this.subtractPrice(leader, playedCard);
        this.discardPlayedCard(playedCard, game);
        this.givePlayerNextCard(leader, cardIdx, game);
        for (let sideEffect of playedCard.sideEffects) {
          this.sideEffectService.executeEffect(sideEffect, leader, opponent);
        }
        this.swapTurnAfterPlayCard(playedCard, leader, opponent);
        // sprawdzić wygraną
      }
      return { ...game };
    } else {
      throw Error("Engine failure");
    }
  }

  discardCard(cardIdx: CARD_IDX, leader: Player, opponent: Player, game: Game): Game {
    // sprawdz game.state
    if (leader.isMyTurn) {
      const discardedCard: Card = leader.cards[cardIdx];
      this.discardPlayedCard(discardedCard, game);
      this.givePlayerNextCard(leader, cardIdx, game);
      this.swapTurnAfterDiscardCard(leader, opponent);
      return { ...game };
    } else {
      throw Error("Engine failure");
    }
  }

  canPlayThisCard(player: Player, card: Card): boolean {
    return player.bricks.state >= card.price.bricks &&
      player.gems.state >= card.price.gems &&
      player.recruits.state >= card.price.recruits;
  }

  mockPlayCard(cardIdx: CARD_IDX, leader: Player, opponent: Player) {
    const playedCard: Card = leader.cards[cardIdx];
    this.subtractPrice(leader, playedCard);
    for (let sideEffect of playedCard.sideEffects) {
      this.sideEffectService.executeEffect(sideEffect, leader, opponent);
    }
  }

  private subtractPrice(player: Player, card: Card) {
    const newPlayer: Player = { ...player };
    newPlayer.bricks.state -= card.price.bricks;
    newPlayer.gems.state -= card.price.gems;
    newPlayer.recruits.state -= card.price.recruits;
    return newPlayer;
  }

  private discardPlayedCard(card: Card, game: Game) {
    game.discardedWaist.push(card);
  }

  private givePlayerNextCard(player: Player, cardIdx: CARD_IDX, game: Game) {
    const nextCardFromWaist: NextCardFromWaist = this.waistService.nextCardFromWaist(game.waist, game.discardedWaist);
    player.cards[cardIdx] = nextCardFromWaist.card;
    game.waist = nextCardFromWaist.waist;
    game.discardedWaist = nextCardFromWaist.discardedWaist;
  }

  private swapTurnAfterPlayCard(playedCard: Card, leader: Player, opponent: Player) {
    if (!playedCard.playAgain && !leader.haveCardToDiscard) {
      this.swapTurn(leader, opponent);
    }
  }

  private swapTurnAfterDiscardCard(leader: Player, opponent: Player) {
    if (leader.haveCardToDiscard) {
      --leader.haveCardToDiscard;
    } else {
      this.swapTurn(leader, opponent);
    }
  }

  private swapTurn(leader: Player, opponent: Player) {
    leader.isMyTurn = false;
    opponent.isMyTurn = true;
    this.increaseResources(opponent);
  }

  private increaseResources(player: Player) {
    player.bricks.state += player.bricks.growth;
    player.gems.state += player.gems.growth;
    player.recruits.state += player.recruits.growth;
  }
}
