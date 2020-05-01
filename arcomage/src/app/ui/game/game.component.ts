import { Component, OnInit, HostListener } from '@angular/core';
import { ResourcesSide } from '../enum/resources-side.enum';
import { GameImages } from '../enum/game-images.enum';
import { TableService } from '../../engine/service/table.service';
import { AIService } from '../../engine/service/ai.service';
import { GameDTO } from '../../engine/dto/game-dto';
import { CardClick } from '../interface/card-click';
import { MouseButton } from '../enum/mouse-button.enum';
import { UsedCardDTO } from '../../engine/dto/used-card-dto';
import { GameMessage } from '../interface/game-messages';
import { GameSide } from '../../engine/enum/game-side.enum';
import { GameAction } from '../../engine/enum/game-action.enum';
import { GameState } from '../../engine/enum/game-state.enum';
import { MessagesMap } from '../../shared/util/messages-map';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private static readonly MENU_PATH: string = '/menu';
  private static readonly ROUTE_PARAM_INIT_TOWER: string = 'tower';
  private static readonly ROUTE_PARAM_INIT_WALL: string = 'wall';
  private static readonly ROUTE_PARAM_INIT_RESOURCE_STATE: string = 'resource-state';
  private static readonly ROUTE_PARAM_INIT_RESOURCE_GROWTH: string = 'resource-growth';
  private static readonly ROUTE_PARAM_INIT_TOWER_TO_WIN: string = 'tower-to-win';

  MESSAGES_MAP: typeof MessagesMap = MessagesMap;
  RESOURCES_SIDE: typeof ResourcesSide = ResourcesSide;
  GAME_IMAGES: typeof GameImages = GameImages;

  game: GameDTO;
  messages: GameMessage[];
  
  @HostListener('window:keydown.esc')
  backToMenu() {
    this.router.navigate([GameComponent.MENU_PATH]);
  }

  constructor(private route: ActivatedRoute, private router: Router, private tableService: TableService, private aiService: AIService) { }

  ngOnInit(): void {
    const initialTowerHeight = Number(this.route.snapshot.paramMap.get(GameComponent.ROUTE_PARAM_INIT_TOWER));
    const initialWallHeight = Number(this.route.snapshot.paramMap.get(GameComponent.ROUTE_PARAM_INIT_WALL));
    const initialRsourcesState = Number(this.route.snapshot.paramMap.get(GameComponent.ROUTE_PARAM_INIT_RESOURCE_STATE));
    const initialGrowthGrowth = Number(this.route.snapshot.paramMap.get(GameComponent.ROUTE_PARAM_INIT_RESOURCE_GROWTH));
    const towerHeightForWin = Number(this.route.snapshot.paramMap.get(GameComponent.ROUTE_PARAM_INIT_TOWER_TO_WIN));
    this.game = this.tableService.createGame(initialTowerHeight, initialWallHeight, initialRsourcesState, initialGrowthGrowth, towerHeightForWin);
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

  allMessagesShowed(): void {
    if (this.game.gameState == GameState.END) {
      this.router.navigate([GameComponent.MENU_PATH]);
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
