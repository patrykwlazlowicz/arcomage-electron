import { Component, OnInit } from '@angular/core';
import { ResourcesSide } from '../enum/resources-side.enum';
import { GameImages } from '../enum/game-images.enum';
import { TableService } from '../../engine/service/table.service';
import { AIService } from '../../engine/service/ai.service';
import { GameDTO } from '../../engine/dto/game-dto';
import { CardClick } from '../interface/card-click';
import { MouseButton } from '../enum/mouse-button.enum';
import { UsedCardDTO } from '../../engine/dto/used-card-dto';
import { MessagesMap, GameMessage } from '../interface/game-messages';
import { GameSide } from '../../engine/enum/game-side.enum';
import { GameAction } from '../../engine/enum/game-action.enum';
import { GameState } from '../../engine/enum/game-state.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  MESSAGES_MAP: typeof MessagesMap = MessagesMap;
  RESOURCES_SIDE: typeof ResourcesSide = ResourcesSide;
  GAME_IMAGES: typeof GameImages = GameImages;

  game: GameDTO;
  messages: GameMessage[];

  constructor(private tableService: TableService, private aiService: AIService) { }

  ngOnInit(): void {
    this.game = this.tableService.createGame(25, 10, 15, 1, 50);
  }

  playCard(event: CardClick): void {
    if (this.game.gameState == GameState.PLAY) {
      const tempMsgs: GameMessage[] = [];
      if (event.button === MouseButton.LEFT) {
        this.game = this.tableService.playerPlayCard(event.cardIdx, this.game);
      } else {
        this.game = this.tableService.playerDiscardCard(event.cardIdx, this.game);
      }
      tempMsgs.push(...this.createMessagesAfterMove(this.game.lastUsedCards, true));
      if (this.game.gameState == GameState.PLAY && !this.game.playerRed.isMyTurn) {
        this.game = this.aiService.playPoorAI(this.game);
        tempMsgs.push(...this.createMessagesAfterMove(this.game.lastUsedCards, false));
      }
      this.messages = tempMsgs;
    }
  }

  private createMessagesAfterMove(lastUsedCards: UsedCardDTO[], playerRedMove: boolean): GameMessage[] {
    const gameMesseges: GameMessage[] = [];
    for (let usedCard of lastUsedCards) {
      gameMesseges.push(<GameMessage>{
        messageKey: MessagesMap.mapBySideAndAction(usedCard.usedBySide, usedCard.usedAction),
        messageImageName: usedCard.usedBySide == GameSide.PLAYER_BLUE && usedCard.usedAction === GameAction.DISCARD ? null : usedCard.card.name
      });
    }
    if (playerRedMove && this.game.playerRed.haveCardToDiscard) {
      gameMesseges.push(<GameMessage>{
        messageKey: MessagesMap.gameMsgPlayerRedHaveToDiscard
      })
    }
    if (this.game.gameState == GameState.END) {
      gameMesseges.push(<GameMessage>{
        messageKey: MessagesMap.mapGameEnd(this.game.whoWin)
      })
    }
    return gameMesseges;
  }

}
