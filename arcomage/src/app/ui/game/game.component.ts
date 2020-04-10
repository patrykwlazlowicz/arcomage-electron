import { Component, OnInit } from '@angular/core';
import { ResourcesSide } from '../enum/resources-side.enum';
import { GameImages } from '../enum/game-images.enum';
import { TableService } from 'src/app/engine/service/table.service';
import { AIService } from 'src/app/engine/service/ai.service';
import { GameDTO } from 'src/app/engine/dto/game-dto';
import { CardClick } from '../interface/card-click';
import { MouseButton } from '../enum/mouse-button.enum';
import { UsedCardDTO } from 'src/app/engine/dto/used-card-dto';
import { MessagesMap, GameMessage } from '../interface/game-messages';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  RESOURCES_SIDE: typeof ResourcesSide = ResourcesSide;
  GAME_IMAGES: typeof GameImages = GameImages;

  game: GameDTO;
  messages: GameMessage[];

  constructor(private tableService: TableService, private aiService: AIService) { }

  ngOnInit(): void {
    this.game = this.tableService.createGame(25, 10, 15, 1, 50);
  }

  playCard(event: CardClick) {
    const tempMsgs: GameMessage[] = [];
    if (event.button === MouseButton.LEFT) {
      this.game = this.tableService.playerPlayCard(event.cardIdx, this.game);
    } else {
      this.game = this.tableService.playerDiscardCard(event.cardIdx, this.game);
    }
    tempMsgs.push(...this.createMessagesFromUsedCard(this.game.lastUsedCards));
    if(this.game.playerRed.haveCardToDiscard) {
      tempMsgs.push(<GameMessage> {
        messageKey: MessagesMap.gameMsgPlayerRedHaveToDiscard
      })
    }
    if (!this.game.playerRed.isMyTurn) {
      this.game = this.aiService.playPoorAI(this.game);
      tempMsgs.push(...this.createMessagesFromUsedCard(this.game.lastUsedCards));
    }
    this.messages = tempMsgs;
  }

  private createMessagesFromUsedCard(lastUsedCards: UsedCardDTO[]): GameMessage[] {
    const gameMesseges: GameMessage[] = [];
    for (let usedCard of lastUsedCards) {
      gameMesseges.push(<GameMessage> {
        messageKey: MessagesMap.mapBySideAndAction(usedCard.usedBySide, usedCard.usedAction),
        messageImageName: usedCard.card.name
      })
    }
    return gameMesseges;
  }

}
