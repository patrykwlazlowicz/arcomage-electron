import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import { TableService } from './table.service';
import { CardPlayingService } from './card-playing.service';
import { CARD_IDX } from '../enum/card-idx.enum';
import { Card } from '../model/card';
import { Player } from '../model/player';

interface CardPoints {
  idx: CARD_IDX;
  points: number;
  isWinnigCard: boolean;
  isLoosingCard: boolean;
}

@Injectable()
export class AIService {

  constructor(private tableService: TableService,
    private cardPlayingService: CardPlayingService) { }

  playPoorAI(game: Game): Game {
    let newGame = { ...game };
    let cardWasntPlayed = true;
    while (newGame.playerBlue.isMyTurn) {
      for (let priority = 1; priority <= 4 && cardWasntPlayed; ++priority) {
        for (let i = 0; i < CARD_IDX.LENGTH && cardWasntPlayed; ++i) {
          if (this.cardPlayingService.canPlayThisCard(newGame.playerBlue, newGame.playerBlue.cards[i]) &&
            newGame.playerBlue.cards[i].priorityForAI == priority
          ) {
            cardWasntPlayed = true;
            newGame = this.cardPlayingService.playCard(i, newGame.playerBlue, newGame.playerRed, newGame);
          }
        }
      }
      for (let priority = 5; priority >= 1 && cardWasntPlayed; --priority) {
        for (let i = 0; i < CARD_IDX.LENGTH && cardWasntPlayed; ++i) {
          if (newGame.playerBlue.cards[i].priorityForAI == priority) {
            cardWasntPlayed = true;
            newGame = this.cardPlayingService.discardCard(i, newGame.playerBlue, newGame.playerRed, newGame);
          }
        }
      }
    }
    return newGame;
  }

  private play(game: Game): Game {
    let newGame = { ...game };
    while (newGame.playerBlue.isMyTurn) {
      while (newGame.playerBlue.haveCardToDiscard) {
        // odrzuć wszystki do odrzucenia  od najgorszej
      }
      // policz najlepsze
      // znajdź wygrywającą
      // jak nie to zagraj najlepszą
      // jak nie zagrałeś to policz najgorsze
      // odrzuć najgorszą
    }
    return newGame;
  }

  private calculateCardToDiscard(cards: Card[], game: Game): CardPoints[] {
    const calculatedCardPoints: CardPoints[] = [];
    // zrób mocki playerów
    for (let card of cards) {
    }
    return calculatedCardPoints;
  }

  private calculateCardToPlay(cards: Card[], game: Game): CardPoints[] {
    const calculatedCardPoints: CardPoints[] = [];
    // zrób mocki playerów
    // filtruj po przegrywających
    // sprawdź cenę
    for (let card of cards) {
    }
    return calculatedCardPoints;
  }

  private calculateCardEffect(leader: Player, opponent: Player): CardPoints {
    return null;
  }
}
